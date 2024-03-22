import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwt_secret = process.env.JWT_SECRET || '';

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token: any = req.headers.authorization?.split(' ')[1];
    console.log(token);

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
    }
    console.log(token);

    try {
        const decode = jwt.verify(token, jwt_secret) as JwtPayload;
        req.user = decode;
        next();

    } catch (error) {
        res.status(500).json({ message: 'internal servor error here' });
    }
}