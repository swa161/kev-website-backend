import {Request, Response} from "express";
import Logger from '../../config/logger'
import {readImage, addImage, removeImage} from "../models/image.model";
import * as Photo from "../models/photo.model";
import {validate} from "../services/validator";
import * as schemas from "../resources/schemas.json"
import {getImageExtension} from "../models/imageTools";
import {cachedDataVersionTag} from "node:v8";

const getAllPhotos = async(req: Request, res: Response): Promise<void> => {
    try {
        const result = await Photo.getAllPhoto()
        res.status(200).send(result)
    } catch (err) {
        Logger.error(err)
        res.statusMessage = 'Internal Server Error'
        res.status(500).send()
    }
}

const addPhoto = async (req: Request, res: Response): Promise<void> => {
    try{
        const validation = await validate(schemas.photo_create, req.body)
        if (validation !== true) {
            res.statusMessage = `Bad Request: invalid information entered`
            res.status(400).send()
            return
        }

        const formData = req.body
        const mimeType = req.file.mimetype
        const imageExt = getImageExtension(mimeType)
        if (imageExt === null) {
            res.statusMessage = `Bad Request: photo must be image/png, image/jpeg, image/git type, but it was: ${mimeType}`
            res.status(400).send()
            return
        }
        if (req.file.buffer.length === undefined) {
            res.statusMessage = `Bad Request: empty image`
            res.status(400).send()
            return
        }
        const filename = await addImage(req.file.buffer, imageExt)
        formData.image_url = filename
        await Photo.addPhoto(formData as photoCreate)
        res.status(200).send()
        return

    } catch (err) {
        Logger.error(err.toString())
        res.statusMessage = 'Internal Server Error'
        res.status(500).send()
        return
    }
}

// Fetch image metadata
const getOnePhoto = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.photoId, 10)
        if (isNaN(id)) {
            res.statusMessage = 'Invalid ID'
            res.status(400).send()
            return
        }
        const photo = await Photo.getPhotoById(id)
        if (photo === null || photo === undefined) {
            res.statusMessage = `No photo found with id ${id}`
            res.status(404).send()
            return
        }
        res.status(200).send(photo)

        return
    } catch (err) {
        Logger.error(err.toString())
        res.statusMessage = 'Internal Server Error'
        res.status(500).send()
        return
    }
}

const removePhoto = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.photoId, 10)
        if (isNaN(id)) {
            res.statusMessage = 'Invalid ID'
            res.status(400).send()
            return
        }
        await Photo.removeOnePhoto(id)
        res.status(200).send()
        return
    } catch (err) {
        Logger.error(err.toString())
        res.statusMessage = 'Internal Server Error'
        res.status(500).send()
        return
    }
}

const getPhotoImage = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}



export{getAllPhotos, addPhoto, getOnePhoto,removePhoto, getPhotoImage}