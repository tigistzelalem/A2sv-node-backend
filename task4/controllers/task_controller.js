const Task = require('../models/tasks');

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({
            title,
            description
        });
        await task.save()
        res.status(201).json({ message: 'Task created', task });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }

}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json({ message: 'Here Are Your Tasks', tasks });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task Fetched', task });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description },
            {new: true}
        
        );
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }
}


export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted'});

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}