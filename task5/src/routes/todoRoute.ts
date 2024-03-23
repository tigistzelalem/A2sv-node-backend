import { Router } from "express";
import { createTodo, deleteToDo, getAllToDos, getToDoById, updateToDo } from "../controllers/todoController";
const router = Router();
import { validateData } from "../middleware/dataValidation";
import { authenticate } from "../middleware/auth";

router.get('/getAllToDo', authenticate, getAllToDos);
router.get('/getToDoById/:id', authenticate, getToDoById);
router.post('/createToDo', authenticate, validateData, createTodo);
router.put('/updateToDo/:id', authenticate, validateData, updateToDo);
router.delete('/deleteToDo/:id', authenticate, deleteToDo);

export default router;