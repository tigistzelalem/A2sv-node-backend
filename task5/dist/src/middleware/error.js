"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../errors/customError");
function errorHandler(err, req, res, next) {
    if (err instanceof customError_1.CustomError) {
        const { statusCode, errors, logging } = err;
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack
            }, null, 2));
        }
        ;
        return res.status(statusCode).send({ errors });
    }
    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: 'something went wrong' }] });
}
exports.default = errorHandler;
