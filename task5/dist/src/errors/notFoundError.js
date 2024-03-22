"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const customError_1 = require("./customError");
class NotFoundError extends customError_1.CustomError {
    constructor(message, context) {
        super(message);
        this.statusCode = 404;
        this.logging = true;
        this.errors = [{ message, context }];
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
exports.default = NotFoundError;
