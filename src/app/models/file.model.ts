import {fs} from "mz";
import {getFileMimeType} from "./fileTools";
import Logger from "../../config/logger";
import {generate} from "rand-token";

const filePath = "./storage/cv/"
const readFile = async (filename: string): Promise<[Buffer, string]> => {
    const file = await fs.readFile(filePath+filename);
    const mimeType = await getFileMimeType(filename)
    return [file, mimeType]
}

const removeFile = async (filename: string): Promise<void> => {
    if (filename) {
        if (await fs.exists(filePath+filename)) {
            await fs.unlink(filePath+filename);
        }
    }
}

const addFile = async (file: any, fileExt: string): Promise<string> => {
    const filename = generate(32) + fileExt
    try {
        await fs.writeFile(filePath+filename, file);
        return filename;
    } catch (err) {
        Logger.error(`Error adding file: ${fileExt}`);
        fs.unlink(filePath+filename).catch(err => {Logger.error(err.toString())});
        throw err;
    }
}

export {readFile, addFile, removeFile, }