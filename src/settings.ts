export interface SettingsModel {
    clip_skip: number,
    guidance_scale: number,
    height: number,
    image_num: number,
    loras: any[],
    model_name: string,
    negative_prompt: "",
    prompt: string,
    sampler_name: string,
    seed: number,
    steps: number,
    width: number
}

export const defaultSettings: SettingsModel = {
    clip_skip: 1,
    guidance_scale: 4,
    height: 512,
    image_num: 4,
    loras: [],
    model_name: "sd3_base_medium.safetensors",
    negative_prompt: "",
    prompt: "",
    sampler_name: "DPM++ 2S a Karras",
    seed: -1,
    steps: 20,
    width: 512
};

export const settingsMap = {
    "image_num": "IMAGE_NUM",
    "model_name": "MODEL",
    "sampler_name": "SAMPLER_NAME",
    "steps": "STEPS",
};