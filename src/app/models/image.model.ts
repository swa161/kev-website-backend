import {fs} from "mz"
import {getImageMimeType} from "./imageTools";
import {generate} from "rand-token";
import Logger from "../../config/logger";

const filepath = "./storage/images/";
const readImage = async(filename: string): Promise<[Buffer, string]> => {
    const image = await fs.readFile(filepath+filename);
    const mimeType = await getImageMimeType(filename);
    return [image, mimeType]
}

const removeImage = async (filename: string) => {
    if (filename) {
        if (await fs.exists(filepath+filename)) {
            await fs.unlink(filepath+filename);
        }
    }
}

const generateImageName = async (fileExt: string): Promise<string> => {
    const filename = generate(32) + fileExt
     try {
        // await fs.writeFile(filepath+ filename, image);
        return filename
     } catch (err) {
        Logger.error(err.toString());
        // fs.unlink(filepath+filename).catch(err => Logger.error(err.toString()));
        throw err
     }
}

export {readImage, removeImage, generateImageName};