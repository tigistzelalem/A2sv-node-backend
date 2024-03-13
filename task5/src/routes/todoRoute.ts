import { Router } from "express";
import { createTodo, deleteToDo, getAllToDos, getToDoById, updateToDo } from "../controllers/todoController";
const router = Router();
import { validateData } from "../middleware/dataValidation";

router.get('/getAllToDo', getAllToDos);
router.get('/getToDoById/:id', getToDoById);
router.post('/createToDo', validateData, createTodo);
router.put('/updateToDo/:id', validateData, updateToDo);
router.delete('/deleteToDo/:id', deleteToDo);

export default router;