import mongoose, { Schema, model, Document } from 'mongoose';

export interface userInt extends Document {
    name: string,
    email: string,
    password: string

}

const userSchmea = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }

});

export default model < userInt > ('User', userSchmea);
