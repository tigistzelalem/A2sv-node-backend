import { CustomError, CustomErrorContent } from "./customError";

export class BadRequestError extends CustomError {
    readonly statusCode = 400;
    readonly errors: CustomErrorContent[];

    constructor(message: string, context?: { [key: string]: any }) {
        super(message);
        this.errors = [{ message, context }];
    }

    readonly logging = true;
}

