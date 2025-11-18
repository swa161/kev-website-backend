import {Request, Response} from "express";
import * as photo from "../models/photo.model"
import Logger from '../../config/logger'
import {readImage, addImage, removeImage} from "../models/image.model";
import {getImageExtension} from "../models/imageTools";

const getAllPhotos = async(req: Request, res: Response): Promise<void> => {
    try {
        const result = await photo.getAllPhoto()
        res.status(200).send(result)
    } catch (err) {
        Logger.error(err)
        res.statusMessage = 'Internal Server Error'
        res.status(500).send()
    }
}

const addPhoto = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Not implemented yet");
}

const getOnePhoto = async(req: Request, res: Response): Promise<void> => {
    throw new Error("Not implemented yet");
}

const removePhoto = async(req: Request, res: Response): Promise<void> => {
    throw new Error("Not implemented yet");
}

const getPhotoImage = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const addPhotoImage = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const deletePhotoImage = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}


export{getAllPhotos, addPhoto, getOnePhoto,removePhoto, getPhotoImage, addPhotoImage, deletePhotoImage}