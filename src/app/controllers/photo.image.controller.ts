import {readImage, addImage, removeImage} from "../models/image.model";
import {getImageExtension} from "../models/imageTools";
import {Request, Response} from "express";
import Logger from '../../config/logger'

const getPhotoImage = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const addPhotoImage = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const deletePhotoImage = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

export{getPhotoImage, addPhotoImage, deletePhotoImage}