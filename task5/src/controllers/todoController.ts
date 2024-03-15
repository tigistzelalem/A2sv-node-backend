import { Request, Response } from "express";
import ToDo, { intToDo } from '../models/todoModel';
import { BadRequestError } from "../errors/badRequest";
import { NotFoundError } from "../errors/notFoundError";

export const getAllToDos = async (req: Request, res: Response): Promise<void> => {
    const todos = await ToDo.find();
    if (!todos || todos.length === 0) {
        throw new NotFoundError('ToDo not found');
    }
    res.status(200).json({ message: 'Here are your todos', todos });
}

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    const { title, description, completed } = req.body;
    if (!title) {
        throw new BadRequestError('Missing required field: title');
    } else if (!description) {
        throw new BadRequestError('Missing required field: description');
    } else if (typeof completed !== 'boolean') {
        throw new BadRequestError('Missing required field: completed');
    }

    const newToDo: intToDo = new ToDo({ title, description, completed });
    await newToDo.save();
    res.status(201).json({ message: "ToDo created", newToDo });
}

export const getToDoById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!id) {
        throw new BadRequestError('Missing required id');
    }
    const todos = await ToDo.findById(id);
    if (!todos) {
        throw new NotFoundError('Todo not found');
    }
    res.status(200).json({ message: 'Here is your todo', todo: todos });
}

export const updateToDo = async (req: Request, res: Response): Promise<void> => {
    const { title, description, completed } = req.body;
    const id = req.params.id;
    if (!title) {
        throw new BadRequestError('Missing required field: title');
    } else if (!description) {
        throw new BadRequestError('Missing required field: description');
    } else if (typeof completed !== 'boolean') {
        throw new BadRequestError('Missing required field: completed');
    }

    if (!id) {
        throw new BadRequestError('Missing required field: id');
    }
    const updateToDos = await ToDo.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
    );
    if (!updateToDos) {
        throw new NotFoundError('Todo not found');
    }
    res.status(200).json({ message: 'ToDo updated' });
}

export const deleteToDo = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!id) {
        throw new BadRequestError('Missing required id');
    }
    const deleteToDos = await ToDo.findByIdAndDelete(id);
    if (!deleteToDos) {
        throw new NotFoundError('Todo not found');
    }
    res.status(200).json({ message: 'Todo deleted' });
}
