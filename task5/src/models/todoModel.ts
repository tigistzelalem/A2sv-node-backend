import { Schema, model, Document } from 'mongoose';

export interface intToDo extends Document {
    title: string,
    description: string,
    completed: boolean

}

const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }

});

export default model<intToDo>('ToDo', todoSchema);