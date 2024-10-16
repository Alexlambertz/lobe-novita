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
    let prompt;
    try {
        let params = await req.json();
        prompt = params.prompt;
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
    })

    let response: any = await generateImage(prompt, pluginSettings.API_KEY, modelSettings);
    let images: any[] = response.images;
    let urls = images.map((line) => line.image_url);

    let resp = {
        images: urls
    };

    if (pluginSettings.RETURN_MARKDOWN) {
        try {
            return new Response(await generateMarkdownResponse(urls));
        } catch (error: any) {
            console.error("Error: " + error.message);
            return createErrorResponse(PluginErrorType.PluginServerError);
        }
    }

    return new Response(JSON.stringify(resp));
}