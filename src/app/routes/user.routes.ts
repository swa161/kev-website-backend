import {Express} from 'express';
import {Request, Response} from 'express';
import {rootUrl} from "./base.routes";
import {authenticate} from "../middleware/auth.middleware"
import * as user from "../controllers/user.controller"
import * as userImage from "../controllers/user.image.controller"
import * as userCV from "../controllers/user.cv.controller"

module.exports = (app: Express) => {
    app.route(rootUrl) // testing route
        .get((req: Request, res: Response) => {
            res.status(200).send("API WORKING Yeah haha!")
        })

    app.route(rootUrl+'/users/register')
        .post(user.register)

    app.route(rootUrl+'/users/login')
        .post(user.login)

    app.route(rootUrl+'/users/logout')
        .post(authenticate ,user.logout)

    app.route(rootUrl+'/users/:id')
        .get(user.viewUser)
        .patch(authenticate, user.update)
        .put(authenticate, user.updatePassword)

    app.route(rootUrl+'/users/:id/image')
        .get(userImage.getImage)
        .put(authenticate,userImage.setImage)
        .delete(authenticate,userImage.deleteImage)

    app.route(rootUrl+'/users/:id/cv')
        .get(userCV.getCV)
        .put(authenticate,userCV.setCV)
        .delete(authenticate,userCV.deleteCV)
}
