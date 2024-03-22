import mongoose, { Schema, model, Document } from 'mongoose';
import User from '../models/user_model';

export interface intToDo extends Document {
    todoId: string,
    title: string,
    description: string,
    completed: boolean,
    user: Schema.Types.ObjectId

}

const todoSchema = new Schema({
    todoId: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: User }

});

export default model<intToDo>('ToDo', todoSchema);