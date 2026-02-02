import {Request, Response} from "express";
import Logger from '../../config/logger'
import {readImage, generateImageName, removeImage} from "../models/image.model";
import * as Photo from "../models/photo.model";
import {validate} from "../services/validator";
import * as schemas from "../resources/schemas.json"
import {getImageExtension} from "../models/imageTools";
import { uploadImageToR2, deleteImageFromR2 } from "../services/r2_service";



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
        // const d = new Date()
        // const creationDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
        const formData = req.body
        const mimeType = req.file.mimetype
        const file = req.file.buffer
        const imageExt = getImageExtension(mimeType)
        if (imageExt === null) {
            res.statusMessage = `Bad Request: photo must be image/png, image/jpeg, image/gif, image/webp type, but it was: ${mimeType}`
            res.status(400).send()
            return
        }
        if (req.file.buffer.length === undefined) {
            res.statusMessage = `Bad Request: empty image`
            res.status(400).send()
            return
        }
        const filename = await generateImageName(imageExt)
        formData.image_url = filename
        // formData.created_at = creationDate
        await uploadImageToR2({file, fileName: filename, mimeType, directory:'photos'})
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

        const filePath = (await Photo.getPhotoById(id))

        await deleteImageFromR2({filePath: filePath.image_url})
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

// const getPhotoImage = async (req: Request, res: Response) => {
//     try {
//         const id = parseInt(req.params.photoId, 10)
//         if (isNaN(id)) {
//             res.statusMessage = 'Invalid ID'
//             res.status(400).send()
//             return
//         }
//         const imageName = await Photo.getPhotoName(id)
//         Logger.info(imageName)
//         const [image, mimeType] = await readImage(imageName)
//         res.setHeader('Cache-Control','public, max-age=3600, immutable')
//         res.status(200).contentType(mimeType).send(image)
//         return
//     } catch (err) {
//         Logger.error(err.toString())
//         res.statusMessage = 'Internal Server Error'
//         res.status(500).send()
//         return
//     }
// }



export{getAllPhotos, addPhoto, getOnePhoto,removePhoto}