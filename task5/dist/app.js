"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const error_1 = __importDefault(require("./middleware/error"));
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use('/api', todoRoute_1.default);
mongoose_1.default.connect('mongodb://localhost:27017/todoListDB')
    .then(() => {
    console.log('Connected to MongoDB');
    exports.app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
exports.app.use(error_1.default);
