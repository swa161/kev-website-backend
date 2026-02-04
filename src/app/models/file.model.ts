import {fs} from "mz";
import {getFileMimeType} from "./fileTools";
import Logger from "../../config/logger";
import {generate} from "rand-token";

// const filePath = "./storage/cv/"
// const readFile = async (filename: string): Promise<string> => {
//     // const file = await fs.readFile(filePath+filename);
//     const mimeType = await getFileMimeType(filename)
//     return mimeType
// }

// const removeFile = async (filename: string): Promise<void> => {
//     if (filename) {
//         if (await fs.exists(filePath+filename)) {
//             await fs.unlink(filePath+filename);
//         }
//     }
// }

const generateCVName = async (fileExt: string): Promise<string> => {
    const filename = generate(32) + fileExt
    try {
        return filename;
    } catch (err) {
        Logger.error(`Error adding file: ${fileExt}`);
        throw err;
    }
}

export { generateCVName }