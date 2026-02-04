import {Request, Response} from "express";
import {getFileExtension} from "../models/fileTools";
import * as User from '../models/user.model'
import Logger from "../../config/logger"
import { deleteImageFromR2, uploadImageToR2 } from "../services/r2_service";
import { generateCVName} from '../models/file.model'

const getCV = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = `Id must be a number`
            res.status(400).send()
            return
        }
        const filename = await User.getCVname(id)
        if (filename === null) {
            res.statusMessage = `User does not have a CV yet`
            res.status(404).send()
            return
        }
        const cvName = await User.getCVname(id)
        res.status(200).send(cvName)
        return
    } catch (err) {
        Logger.error(err.toString())
        res.status(500).send("Error happend during fetching CV name")
        return
    }
}

const setCV = async (req: Request, res: Response) => {
    try {
        let isNew = true
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = `Id must be a number`
            res.status(400).send()
            return
        }
        const file = req.body
        const user = await User.findUserById(id)
        if (req.authId !== id) {
            res.statusMessage = `Forbidden, id mismatch`
            res.status(403).send()
            return
        }
        if (user === null) {
            res.statusMessage = `User does not exists`
            res.status(404).send()
            return
        }
        const mimeType = req.header('Content-Type')
        const fileExt = getFileExtension(mimeType)
        if(fileExt === null) {
            res.statusMessage = `Bad Requst: file must be a pdf`
            res.status(400).send()
            return
        }
        if (file.length === undefined){
            res.statusMessage = `Bad Requst: empty file`
            res.status(400).send()
            return
        }
        const filename = await User.getCVname(id)
        if (filename != null && filename !== "") {
            isNew = false
        }
        const newFilename = await generateCVName(fileExt)
        const oldCVName = await User.getCVname(id)
        await deleteImageFromR2({filePath: oldCVName})
        await uploadImageToR2({file: req.body, fileName: newFilename, mimeType, directory: 'cv'})
        await User.updateCVname(id, newFilename)
        if (isNew) {
            res.status(201).send()
            return
        } else {
            res.status(200).send()
            return
        }
    } catch (err) {
        Logger.error(err.toString())
        res.status(500).send("Internal Server Error")
        return
    }
}

const deleteCV = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = `Id must be a number`
            res.status(400).send()
            return
        }
        const user = await User.findUserById(id)
        if (req.authId !== id) {
            res.statusMessage = `Forbidden, id mismatch`
            res.status(403).send()
            return
        }
        if (user === null) {
            res.statusMessage = `User does not exists`
            res.status(404).send()
            return
        }
        const filename = await User.getCVname(id)
        Logger.info(filename)
        if (filename === null || filename === "") {
            res.statusMessage = `Bad Requst: User does not have a CV yet`
            res.status(404).send()
            return
        }
        Logger.info("Removing CV")
        await User.removeCVname(id)
        res.status(200).send()
        return
    } catch (err) {
        Logger.error(err.toString())
        res.status(500).send("Internal Server Error")
        return
    }
}

export {getCV, setCV, deleteCV}