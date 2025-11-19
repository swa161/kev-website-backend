import {Request, Response} from 'express'
import Logger from '../../config/logger'
import * as User from '../models/user.model'
import * as schemas from '../resources/schemas.json'
import {uid} from "rand-token"
import {validate} from '../services/validator'
import * as password from "../services/password";

const register = async (req: Request, res: Response) => {
    try {
        const validation = await validate(schemas.user_register, req.body)
        if (!validation) {
            res.statusMessage = `Bad Request: ${validation.toString()}`
            res.status(400).send()
            return
        }
        req.body.password = await password.hash(req.body.password)
        const result = await User.register(req.body)
        res.status(201).send({userID: result.id})
        return
    } catch (err) {
        Logger.error(err)
        if (err.code === '23505') { // 23505 Indicates an attempt to insert or update a row that would violate a unique constraint.
            res.statusMessage = `Forbidden, Email already exists, ${err.message}`
            res.status(403).send()
            return
        } else {
            Logger.error(err.toString())
            res.statusMessage = "Internal Server Error"
            res.status(500).send()
            return
        }
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const validation = await validate(schemas.user_login, req.body)
        if (!validation) {
            res.statusMessage = `Bad Request: ${validation.toString()}`
            res.status(400).send()
            return
        }
        const user = await User.findUserByEmail(req.body.email)
        if (user === null || !await password.compare(req.body.password, user.password)) {
            res.statusMessage = `Invalid email or password`
            res.status(401).send()
            return
        }
        const token = uid(64)
        await User.login(user.id, token)
        res.status(200).send({userId: user.id, userToken: token})
        return
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error"
        res.status(500).send()
        return
    }

}

const logout = async (req: Request, res: Response) => {
    try {
        const userId = req.authId
        const result = await User.logout(userId)
        res.status(200).send({userId: result.id})
        return

    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error"
        res.status(500).send()
        return
    }
}

const viewUser = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

const update = async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
}

export {register, login, viewUser, logout, update}