"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_secret = process.env.JWT_SECRET || '';
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(token);
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
    }
    console.log(token);
    try {
        const decode = jsonwebtoken_1.default.verify(token, jwt_secret);
        req.user = decode;
        next();
    }
    catch (error) {
        res.status(500).json({ message: 'internal servor error here' });
    }
};
exports.authenticate = authenticate;
