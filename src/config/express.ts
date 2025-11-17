import express from "express";
import bodyParser from "body-parser";

export default () => {
    const app = express();
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });
    app.use(bodyParser.json());
    return app
}