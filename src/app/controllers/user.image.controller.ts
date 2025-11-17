import {Request, Response} from "express";
import * as Users from "../models/user.model";
// Write image model and import
import Logger from "../../config/logger";
import {getImageExtension} from "../models/imageTools"

const getImage = async (req: Request, res: Response) => {
    throw Error("Not yet implemented");
}

const setImage = async (req: Request, res: Response) => {
    throw Error("Not yet implemented");
}

const deleteImage = async (req: Request, res: Response) => {
    throw Error("Not yet implemented");
}

export {getImage, setImage, deleteImage};