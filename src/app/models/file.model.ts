import {fs} from "mz";
import {getFileMimeType} from "./fileTools";
import Logger from "../../config/logger";

const filePath = "./storage/cv"
const readFile = async (filename: string): Promise<[Buffer, string]> => {
    throw new Error("Not implemented yet");
}

const removeFile = async (filename: string): Promise<void> => {
    throw new Error("Not implemented yet");
}

const addFile = async (filename: string, fileExt: string): Promise<string> => {
    throw new Error("Not implemented yet");
}

export {readFile, addFile, removeFile}