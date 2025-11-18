import {Request, Response} from "express";
import {getFileExtension} from "../models/fileTools";
import {readFile, addFile, removeFile} from "../models/file.model";
import Logger from "../../config/logger"


const getCV = async(req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const setCV = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const deleteCV = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

export {getCV, setCV, deleteCV}