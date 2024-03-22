import { Request, Response } from 'express';
import User, { userInt } from '../models/user_model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;
console.log('secret', jwt_secret)

export const signup = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser: userInt | null = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already registered" });
        }

        const newUser: userInt = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: 'registered successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'internal server error' });
    }
}

export const signin = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
        const user: userInt | null = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token: string = jwt.sign({
            email: user.email,
            id: user.id,
        },
            jwt_secret || '', { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Signed in successfully', token, user });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

