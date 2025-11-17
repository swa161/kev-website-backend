import express from "express";
import bodyParser from "body-parser";
import allowCrossOriginRequestsMiddleware from "../app/middleware/cors.middleware"
import {rootUrl} from "../app/routes/base.routes";
import Logger from "./logger"

export default () => {
    const app = express();
    // Middleware
    app.use(allowCrossOriginRequestsMiddleware);
    app.use(bodyParser.json());
    app.use(bodyParser.raw({type: 'text/plain'}));
    app.use(bodyParser.raw({type: ['image/*'], limit: '5mb'}));

    // debug
    app.use((req, res, next)=> {
        if (req.path !== '/') {
            Logger.http(`#### ${req.method} ${req.path} ####`)
        }
        next();
    });

    require('../app/routes/user.routes')(app);
    // require('../app/routes/photo.routes')(app);
    return app
}