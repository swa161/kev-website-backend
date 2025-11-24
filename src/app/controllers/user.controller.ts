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
        if (validation !== true) {
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
        if (validation !== true ) {
            res.statusMessage = `Bad Request: ${validation.toString()}`
            res.status(400).send()
            return
        }
        const user = await User.findUserByEmail(req.body.email)
        if (user.authToken !== null) {
            res.statusMessage = 'User Already Logged In'
            res.status(403).send()
            return
        }
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
        Logger.error(err.toString())
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
        Logger.error(err.toString())
        res.statusMessage = "Internal Server Error"
        res.status(500).send()
        return
    }
}

const viewUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = `Id must be an integer`
            res.status(400).send()
            return
        }
        const user = await User.view(id)
        if (user === null) {
            res.statusMessage = `User does not exist`
            res.status(404).send()
            return
        }
        res.status(200).send({userId: user})
        return

    } catch (err) {
        Logger.error(err.toString())
        res.statusMessage = "Internal Server Error"
        res.status(500).send()
        return
    }

}

const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = `Id must be an integer`
            res.status(400).send()
            return
        }
        const user = await User.findUserById(id)
        if (user === null) {
            res.statusMessage = `User does not exist`
            res.status(404).send()
            return
        }
        Logger.info(req.authId)
        if (req.authId !== id) {
            res.statusMessage = `You do not have the authority`
            res.status(403).send()
            return
        }
        const validation = await validate(schemas.user_edit, req.body)
        if (validation !== true) {
            res.statusMessage = `Bad Request: ${validation.toString()}`
            res.status(400).send()
            return
        }
        Logger.info(req.body)
        if (req.body.hasOwnProperty("email")) {
            user.email = req.body.email
        }
        if (req.body.hasOwnProperty("title")) {
            user.title = req.body.title
        }
        if (req.body.hasOwnProperty("description")) {
            user.description = req.body.description
        }
        if (req.body.hasOwnProperty("physicalAddress")) {
            user.physicalAddress = req.body.physicalAddress
        }
        if (req.body.hasOwnProperty("phoneNumber")) {
            user.phoneNumber = req.body.phoneNumber
        }
        if (req.body.hasOwnProperty("firstName")) {
            user.firstName = req.body.firstName
        }
        if (req.body.hasOwnProperty("lastName")) {
            user.lastName = req.body.lastName
        }
        await User.updateUser(user, id)
        res.status(200).send()
        return

    } catch (err) {
        Logger.error(err.toString())
        res.statusMessage = "Internal Server Error"
        res.status(500).send()
        return
    }
}

const updatePassword = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.statusMessage = `Id must be an integer`
            res.status(400).send()
            return
        }
        const user = await User.findUserById(id)
        if (user === null) {
            res.statusMessage = `User does not exist`
            res.status(404).send()
            return
        }
        if (req.authId !== id) {
            res.statusMessage = `You do not have the authority`
            res.status(403).send()
            return
        }
        const validation = await validate(schemas.user_edit_password, req.body)
        if (validation !== true) {
            res.statusMessage = `Bad Request: ${validation.toString()}`
            res.status(400).send()
            return
        }
        if (!await password.compare(req.body.currentPassword, user.password)) {
            res.statusMessage = `Incorrect current password`
            res.status(401).send()
            return
        }
        if (await password.compare(req.body.newPassword, user.password)) {
            res.statusMessage = 'New password cannot be the same as old password'
            res.status(403).send()
            return
        }
        user.password = await password.hash(req.body.newPassword)
        await User.updateUserPassword(user.password, id)
        res.status(200).send()
        return
    } catch (err) {
        Logger.error(err.toString())
        res.statusMessage = "Internal Server Error"
        res.status(500).send()
        return
    }
}

export {register, login, viewUser, logout, update, updatePassword}