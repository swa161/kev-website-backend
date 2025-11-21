import {Request, Response} from "express";
import * as User from "../models/user.model";
import {readImage, removeImage, addImage} from "../models/image.model";
import Logger from "../../config/logger";
import {getImageExtension} from "../models/imageTools"

const getImage = async (req: Request, res: Response) => {
    try {
        const id = parseInt( req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = 'Id must be an integer'
            res.status(400).send()
            return
        }
        const filename = await User.getImageName(id)
        if (filename === null) {
            res.statusMessage = 'User does not have a profile pic yet.'
            res.status(404).send()
            return
        }
        const [image, mimeType] = await readImage(filename)
        res.status(200).contentType(mimeType).send(image)
        return
    } catch (err) {
        Logger.error(err.toString());
        res.status(500).send("Internal Server Error");
        return
    }
}

const setImage = async (req: Request, res: Response) => {
    try {
        let isNew = true
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = 'Id must be an integer'
            res.status(400).send()
            return
        }
        const image = req.body
        const user = await User.findUserById(id)
        if (req.authId !== id) {
            res.statusMessage = 'Forbidden'
            res.status(403).send()
            return
        }
        if (user === null) {
            res.statusMessage = 'User does not exists'
            res.status(404).send()
            return
        }
        const mimeType = req.header('Content-Type');
        const imageExt = getImageExtension(mimeType);
        if (imageExt === null) {
            res.statusMessage = `Bad Request: photo must be image/png, image/jpeg, image/git type, but it was: ${mimeType}`
            res.status(400).send()
            return
        }
        if (image.length === undefined) {
            res.statusMessage = `Bad Request: empty image`
            res.status(400).send()
            return
        }
        const filename = await User.getImageName(id)
        if (filename != null && filename !== "") {
            await removeImage(filename)
            isNew = false
        }
        const newFilename = await addImage(image, imageExt)
        await User.updateImageName(id, newFilename)
        if (isNew) {
            res.status(201).send()
        } else{
            res.status(200).send()
        }
        return
    } catch (err) {
        Logger.error(err.toString());
        res.status(500).send("Internal Server Error");
        return
    }
}

const deleteImage = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = 'Id must be an integer'
            res.status(400).send()
            return
        }
        const user = await User.findUserById(id)
        if (req.authId !== user.id) {
            res.statusMessage = 'Forbidden'
            res.status(403).send()
            return
        }
        if (user === null) {
            res.statusMessage = 'User does not exists'
            res.status(404).send()
            return
        }
        const filename = await User.getImageName(id)
        if (filename == null || filename === "") {
            res.statusMessage = 'file does not exists'
            res.status(404).send()
            return
        }
        await removeImage(filename)
        await User.removeImageName(id)
        res.status(200).send()
        return
    } catch (err) {
        Logger.error(err.toString());
        res.status(500).send("Internal Server Error");
        return
    }
}

export {getImage, setImage, deleteImage};