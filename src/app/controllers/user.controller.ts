import {Request, Response} from 'express'
import Logger from '../../config/logger'
import * as User from '../models/user.model'
import * as schemas from '../resources/schemas.json'
import {uid} from "rand-token"

const register = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const login = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const logout = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const viewUser = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const update = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

export {register, login, viewUser, logout, update}