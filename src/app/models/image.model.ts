import {fs} from "mz"
import {getImageMimeType} from "./imageTools";
import {generate} from "rand-token";
import Logger from "../../config/logger";

const filepath = "./storage/images";
const readImage = async(filename: string): Promise<[Buffer, string]> => {
    throw new Error("Not implemented yet");
}

const removeImage = async (filename: string) => {
    throw new Error("Not implemented yet");
}

const addImage = async (filename: string, fileExt: string): Promise<string> => {
    throw new Error("Not implemented yet");
}

export {readImage, removeImage, addImage};