"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDo = exports.updateToDo = exports.getToDoById = exports.createTodo = exports.getAllToDos = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
const getAllToDos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.find();
        if (!todos) {
            res.status(404).json({ message: 'No Todos Found' });
        }
        res.status(200).json({ message: 'Here are your todos', todos });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal error occured' });
    }
});
exports.getAllToDos = getAllToDos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, completed } = req.body;
        const newToDo = new todoModel_1.default({ title, description, completed });
        yield newToDo.save();
        res.status(201).json({ message: "ToDo created", newToDo });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal error occured' });
    }
});
exports.createTodo = createTodo;
const getToDoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const todos = yield todoModel_1.default.findById(id);
        if (!todos) {
            res.status(404).json({ message: 'No Todos Found' });
            return;
        }
        res.status(200).json({ message: 'Here are your todos', todos });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal error occured' });
    }
});
exports.getToDoById = getToDoById;
const updateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, completed } = req.body;
        const id = req.params.id;
        const updateToDos = yield todoModel_1.default.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!updateToDos) {
            res.status(404).json({ message: 'ToDo not found' });
        }
        res.status(200).json({ message: 'ToDo updated' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error occured' });
    }
});
exports.updateToDo = updateToDo;
const deleteToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleteToDos = yield todoModel_1.default.findByIdAndDelete(id);
        if (!deleteToDos) {
            res.status(404).json({ message: 'ToDo not found' });
        }
        res.status(200).json({ message: 'Todo deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error occured' });
    }
});
exports.deleteToDo = deleteToDo;
