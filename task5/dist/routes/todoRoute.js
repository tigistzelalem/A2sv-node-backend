"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const router = (0, express_1.Router)();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
router.use('/api-docs', swagger_ui_express_1.default.serve);
router.get('/api-docs', swagger_ui_express_1.default.setup(swagger_json_1.default));
router.get('/getAllToDo', todoController_1.getAllToDos);
router.get('/getToDoById/:id', todoController_1.getToDoById);
router.post('/createToDo', todoController_1.createTodo);
router.put('/updateToDo/:id', todoController_1.updateToDo);
router.delete('/deleteToDo/:id', todoController_1.deleteToDo);
exports.default = router;
