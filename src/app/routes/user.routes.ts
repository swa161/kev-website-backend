import {Express} from 'express';
import {Request, Response} from 'express';
import {rootUrl} from "./base.routes";
// write auth middleware
import * as user from "../controllers/user.controller"
import * as userImage from "../controllers/user.image.controller"

module.exports = (app: Express) => {
    app.route(rootUrl)
        .get((req: Request, res: Response) => {
            res.status(200).send("API WORKING")
        })
    app.route(rootUrl+'/users/register')
        .post(user.register)
    app.route(rootUrl+'/users/login')
        .post(user.login)
    app.route(rootUrl+'/users/logout')
        .post(user.logout) // need to add authenticate
    app.route(rootUrl+'/users/:id')
        .get(user.viewUser)
        .patch(user.update)

    // need to add image routes
}
