import {findUserByToken} from "../models/user.model";
import {NextFunction, Request,Response} from "express";
import Logger from "../../config/logger";



const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header('X-Authorization')
        if (!token) {
            res.statusMessage = "Unauthorized";
            res.status(401).send("Missing auth token");
            return;
        }
        const user = await findUserByToken(token);
        if (user === null) {
            res.statusMessage = "Unauthorized"
            res.status(401).end("Not authorized")
            return;
        }
        req.authId = user.id;
        next();

    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error during authentication";
        res.status(500).send()
        return;
    }
}
// check if the user is a logged-in user, but not the owner
const relaxedAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Not yet implemented");
}

export {authenticate}