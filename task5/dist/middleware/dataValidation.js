"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateData = (req, res, next) => {
    const todoJoiSchema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        completed: joi_1.default.boolean().default(false)
    });
    const { error } = todoJoiSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateData = validateData;
