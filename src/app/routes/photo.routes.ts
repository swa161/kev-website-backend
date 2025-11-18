import {Express, Request, Response} from 'express';
import {rootUrl} from "./base.routes";
import {authenticate} from "../middleware/auth.middleware";
import * as photo from "../controllers/photo.controller";


module.exports = (app: Express) => {

    app.route(rootUrl+'/photos')
        .get(photo.getAllPhotos)
        .post(authenticate, photo.addPhoto);

    app.route(rootUrl+'/photos/:photoId')
        .get(photo.getOnePhoto)
        .delete(authenticate, photo.removePhoto);

    app.route(rootUrl+'/photos/:photoId/image')
        .get(photo.getPhotoImage)
        .post(authenticate,photo.addPhotoImage)
        .delete(authenticate, photo.deletePhotoImage);
}