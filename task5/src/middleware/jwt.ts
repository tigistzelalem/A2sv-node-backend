import jwt from 'jsonwebtoken';
import { userInt } from '../models/user_model';

const jwt_secret = process.env.JWT_SECRET || '';

export function generateAuthToken(user: userInt): string {
    const token: string = jwt.sign({
        email: user.email,
        id: user.id,
    }, jwt_secret, { expiresIn: '1h' });

    return token;
}
