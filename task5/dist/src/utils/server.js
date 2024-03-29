"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoute_1 = __importDefault(require("../routes/todoRoute"));
const user_route_1 = __importDefault(require("../routes/user_route"));
const error_1 = __importDefault(require("../middleware/error"));
function createServer() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use('/api', todoRoute_1.default);
    app.use('/api', user_route_1.default);
    app.use(error_1.default);
    return app;
}
exports.default = createServer;
