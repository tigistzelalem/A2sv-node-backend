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
const badRequest_1 = require("../errors/badRequest");
const notFoundError_1 = require("../errors/notFoundError");
const getAllToDos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todoModel_1.default.find();
    if (!todos || todos.length === 0) {
        throw new notFoundError_1.NotFoundError('ToDo not found');
    }
    res.status(200).json({ message: 'Here are your todos', todos });
});
exports.getAllToDos = getAllToDos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    if (!title) {
        throw new badRequest_1.BadRequestError('Missing required field: title');
    }
    else if (!description) {
        throw new badRequest_1.BadRequestError('Missing required field: description');
    }
    else if (typeof completed !== 'boolean') {
        throw new badRequest_1.BadRequestError('Missing required field: completed');
    }
    const newToDo = new todoModel_1.default({ title, description, completed });
    yield newToDo.save();
    res.status(201).json({ message: "ToDo created", newToDo });
});
exports.createTodo = createTodo;
const getToDoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        throw new badRequest_1.BadRequestError('Missing required id');
    }
    const todos = yield todoModel_1.default.findById(id);
    if (!todos) {
        throw new notFoundError_1.NotFoundError('Todo not found');
    }
    res.status(200).json({ message: 'Here is your todo', todo: todos });
});
exports.getToDoById = getToDoById;
const updateToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    const id = req.params.id;
    if (!title) {
        throw new badRequest_1.BadRequestError('Missing required field: title');
    }
    else if (!description) {
        throw new badRequest_1.BadRequestError('Missing required field: description');
    }
    else if (typeof completed !== 'boolean') {
        throw new badRequest_1.BadRequestError('Missing required field: completed');
    }
    if (!id) {
        throw new badRequest_1.BadRequestError('Missing required field: id');
    }
    const updateToDos = yield todoModel_1.default.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    if (!updateToDos) {
        throw new notFoundError_1.NotFoundError('Todo not found');
    }
    res.status(200).json({ message: 'ToDo updated' });
});
exports.updateToDo = updateToDo;
const deleteToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        throw new badRequest_1.BadRequestError('Missing required id');
    }
    const deleteToDos = yield todoModel_1.default.findByIdAndDelete(id);
    if (!deleteToDos) {
        throw new notFoundError_1.NotFoundError('Todo not found');
    }
    res.status(200).json({ message: 'Todo deleted' });
});
exports.deleteToDo = deleteToDo;
