import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export const validateData = (req: Request, res: Response, next: NextFunction) => {
    const todoJoiSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        completed: Joi.boolean().default(false)
    })
    const { error } = todoJoiSchema.validate(req.body)
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }
    next();
}
