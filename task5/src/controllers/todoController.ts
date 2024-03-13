import { Request, Response } from "express";
import ToDo, { intToDo } from '../models/todoModel';

export const getAllToDos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await ToDo.find();
        if (!todos) {
            res.status(404).json({ message: 'No Todos Found' })
        }

        res.status(200).json({ message: 'Here are your todos', todos });

    } catch (error) {
        res.status(500).json({ message: 'Internal error occured' });

    }
}

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, completed } = req.body;
        const newToDo: intToDo = new ToDo({ title, description, completed });
        await newToDo.save();
        res.status(201).json({ message: "ToDo created", newToDo });
    } catch (error) {
        res.status(500).json({ message: 'Internal error occured' });


    }

}


export const getToDoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const todos = await ToDo.findById(id);
        if (!todos) {
            res.status(404).json({ message: 'No Todos Found' });
            return;
        }

        res.status(200).json({ message: 'Here are your todos', todos });

    } catch (error) {
        res.status(500).json({ message: 'Internal error occured' });


    }
}

export const updateToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, completed } = req.body;
        const id = req.params.id
        const updateToDos = await ToDo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );

        if (!updateToDos) {
            res.status(404).json({ message: 'ToDo not found' });
        }

        res.status(200).json({ message: 'ToDo updated' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error occured' });


    }

}

export const deleteToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const deleteToDos = await ToDo.findByIdAndDelete(id);
        if (!deleteToDos) {
            res.status(404).json({ message: 'ToDo not found' });
        }
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error occured' });

    }
}