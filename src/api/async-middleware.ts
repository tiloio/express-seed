import express = require("express");

export const asyncMiddleware = (fn: Function) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            console.error(`Error occured at '${req.originalUrl}':`, error);
            res.statusCode = 500;
            res.send();
            next();
        });
    };
