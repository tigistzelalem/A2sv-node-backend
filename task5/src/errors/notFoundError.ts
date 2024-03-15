import { CustomError, CustomErrorContent } from "./customError";

export class NotFoundError extends CustomError {
    readonly statusCode = 404;
    readonly errors: CustomErrorContent[];

    constructor(message: string, context?: { [key: string]: any }) {
        super(message);
        this.errors = [{ message, context }];
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    readonly logging = true;
}

export default NotFoundError;