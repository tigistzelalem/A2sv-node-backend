const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task_controller');

router.post('/createTask', taskController.createTask);
router.post('/getAllTask', taskController.getAllTasks);
router.post('/getTask/:id', taskController.getTaskById);
router.post('/updateTask/:id', taskController.updateTask);
router.post('/deleteTask/:id', taskController.deleteTask);