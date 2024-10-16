import { NovitaSDK, TaskStatus } from "novita-sdk";
import { SettingsModel } from './settings';

export function generateImage(prompt: string, apiKey: string, settings: SettingsModel) {
    return new Promise(function (resolve) {
        const novitaClient = new NovitaSDK(apiKey);

        settings.prompt = prompt;

        novitaClient.txt2Img({
            request: settings
        })
            .then((res) => {
                if (res && res.task_id) {
                    const timer = setInterval(() => {
                        novitaClient.progress({
                            task_id: res.task_id,
                        })
                            .then((progressRes) => {
                                if (progressRes.task.status === TaskStatus.SUCCEED) {
                                    console.log("finished!");
                                    clearInterval(timer);
                                    resolve(progressRes);
                                }
                                if (progressRes.task.status === TaskStatus.FAILED) {
                                    console.warn("failed!", progressRes.task.reason);
                                    clearInterval(timer);
                                    throw new Error('Text2Image failed: ' + progressRes.task.reason);
                                }
                                if (progressRes.task.status === TaskStatus.QUEUED) {
                                    console.log("queueing");
                                }
                            })
                            .catch((error) => {
                                console.error("progress error:", error);
                                throw new Error('Text2Image failed: ' + error.message);
                            })
                    }, 1000);
                }
            })
            .catch((error) => {
                console.error("txt2Img error:", error);
                throw new Error('Text2Image failed: ' + error.message);
            })
    })
}