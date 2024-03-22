"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const customError_1 = require("./customError");
class BadRequestError extends customError_1.CustomError {
    constructor(message, context) {
        super(message);
        this.statusCode = 400;
        this.logging = true;
        this.errors = [{ message, context }];
    }
}
exports.BadRequestError = BadRequestError;
