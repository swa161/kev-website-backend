import {Express, Request, Response} from 'express';
import {rootUrl} from "./base.routes";
import {authenticate} from "../middleware/auth.middleware";
import * as photo from "../controllers/photo.controller";
import * as multer from "multer"

const upload = multer.default({storage: multer.memoryStorage()})

module.exports = (app: Express) => {

    app.route(rootUrl+'/photos')
        .get(photo.getAllPhotos)
        .post(authenticate,upload.single('image'), photo.addPhoto);

    app.route(rootUrl+'/photos/:photoId')
        .get(photo.getOnePhoto)
        .delete(authenticate, photo.removePhoto);

    app.route(rootUrl+'/photos/:photoId/image')
        .get(photo.getPhotoImage)

}