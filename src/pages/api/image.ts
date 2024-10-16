import {
    getPluginSettingsFromRequest,
    PluginErrorType, createErrorResponse
} from '@lobehub/chat-plugin-sdk';

import { generateImage } from '../../novita';
import { generateMarkdownResponse } from '../../helper';
import { settingsMap, defaultSettings, SettingsModel } from '../../settings';

export const config = {
    runtime: 'edge',
};

export default async (req: Request) => {
    let prompt: string;
    let height: number;
    let width: number;
    try {
        let params = await req.json();
        prompt = params.prompt;
        height = params.height;
        width = params.width;
    } catch (error: any) {
        console.error("Error: " + error.message);
        return createErrorResponse(PluginErrorType.PluginServerError);
    }

    const pluginSettings = getPluginSettingsFromRequest(req);
    const modelSettings: SettingsModel = defaultSettings;

    let keys: string[] = Object.keys(settingsMap);

    keys.forEach(function (key) {
        // @ts-expect-error
        if (pluginSettings[settingsMap[key]]) {
            // @ts-expect-error
            modelSettings[key] = pluginSettings[settingsMap[key]];
        }
    });

    modelSettings.height = height;
    modelSettings.width = width;

    let response: any = await generateImage(prompt, pluginSettings.API_KEY, modelSettings);
    let images: any[] = response.images;
    let urls = images.map((line) => line.image_url);

    let resp = {
        images: urls
    };

    if (pluginSettings.RETURN_TYPE === "Markdown") {
        try {
            return new Response(await generateMarkdownResponse(urls));
        } catch (error: any) {
            console.error("Error: " + error.message);
            return createErrorResponse(PluginErrorType.PluginServerError);
        }
    } else if (pluginSettings.RETURN_TYPE === "Image") {
        return new Response(urls[0]);
    }

    return new Response(JSON.stringify(resp));
}