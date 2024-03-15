import { Request, Response } from "express";
import ToDo, { intToDo } from '../models/todoModel';
import { CustomError } from "../errors/customError";
import { BadRequestError } from "../errors/badRequest";

export const getAllToDos = async (req: Request, res: Response): Promise<void> => {

    const todos = await ToDo.find();
    if (!todos || todos.length === 0) {
        throw new BadRequestError('No Todos were found');
    }

    res.status(200).json({ message: 'Here are your todos', todos });


}

export const createTodo = async (req: Request, res: Response): Promise<void> => {

    const { title, description, completed } = req.body;
    if (!title || !description || !completed) {
        throw new BadRequestError('missing required feilds');
    }
    const newToDo: intToDo = new ToDo({ title, description, completed });
    await newToDo.save();
    res.status(201).json({ message: "ToDo created", newToDo });

}


export const getToDoById = async (req: Request, res: Response): Promise<void> => {

    const id = req.params.id
    if (!id) {
        throw new BadRequestError('Missing required feilds');
    };

    const todos = await ToDo.findById(id);
    res.status(200).json({ message: 'Here are your todos', todos });

}

export const updateToDo = async (req: Request, res: Response): Promise<void> => {

    const { title, description, completed } = req.body;
    const id = req.params.id

    if (!id || !title || !description || !completed) {
        throw new BadRequestError('missing required feilds');
    }

    const updateToDos = await ToDo.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
    );

    if (!updateToDos) {
        throw new BadRequestError('Todo not found');
    }

    res.status(200).json({ message: 'ToDo updated' });

}

export const deleteToDo = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    if (!id) {
        throw new BadRequestError('Todo not found');
    }

    const deleteToDos = await ToDo.findByIdAndDelete(id);
    if (!deleteToDos) {
        throw new BadRequestError('Missing required feilds');
    }
    res.status(200).json({ message: 'Todo deleted' });

}