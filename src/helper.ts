const axios = require('axios');

export async function downloadImageAsBase64(imageUrl: string) {
    try {
        // Make a GET request to the image URL
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer' // Set the response type to arraybuffer to get image data
        });

        // Convert the image data to a Buffer
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Convert the Buffer to a Base64 string
        const base64Image = imageBuffer.toString('base64');

        // Return the Base64 string prefixed with the appropriate data URL scheme
        return `data:${response.headers['content-type']};base64,${base64Image}`;
    } catch (error: any) {
        console.error('Error downloading the image:', error.message);
        throw new Error('Could not download the image: ' + error.message);
    }
}

export async function generateMarkdownResponse(urls: string[]) {
    let imageHashes = [];

    try {
        for (let url of urls) {
            imageHashes.push(await downloadImageAsBase64(url));
        }
    } catch (error: any) {
        console.error("Error: " + error.message);
        throw new Error('Failed to download image from API: ' + error.message);
    }

    let resultString = "Here are your images:\n\n";
    let endString = "";

    let n = 1;
    for (let hash of imageHashes) {
        resultString += "![][image_ref_" + n + "]"
        endString += "\n\n[image_ref_" + n + "]:\n" + hash;
        n += 1;
    }

    resultString += "\n\n" + endString;

    return resultString;
}