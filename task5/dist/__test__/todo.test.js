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
const supertest = require("supertest");
const app_1 = require("../src/app");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
describe('todo', () => {
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        if (!mongoose_1.default.connection.readyState) {
            yield mongoose_1.default.connect(uri);
        }
    }), 10000);
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // await mongoose.dropDatabase()
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    describe('get todo route', () => {
        describe('given the product does not exist', () => {
            it('should return a 404', () => __awaiter(void 0, void 0, void 0, function* () {
                const todoId = 'todo-123';
                yield supertest(app_1.app)
                    .get(`/api/getToDoById$/${todoId}`);
            }));
        });
    });
    // describe('get todo route', () => {
    //     describe('given the product does exist', () => {
    //         // Increase the timeout value for the test
    //         it('should return a 200 status and the product', async () => {
    //             const testTodo = new ToDo({
    //                 title: 'Test todo',
    //                 description: 'test description',
    //                 completed: true
    //             });
    //             await testTodo.save();
    //             const { body, statusCode } = await supertest(app)
    //                 .get(`/api/getToDoById/${testTodo.todoId}`);
    //             expect(statusCode).toBe(200);
    //             expect(body.totId).toBe(testTodo.todoId);
    //         });
    //     });
    // });
});
