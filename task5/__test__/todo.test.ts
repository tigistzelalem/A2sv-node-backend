import supertest = require("supertest")
import createServer from "../src/utils/server";
import ToDo from '../src/models/todoModel';
import { closeMongoServer, mockMongoServer } from "./config/db";
import request from 'supertest';

export const todoPayload = {
    title: 'test title',
    description: 'test description',
    completed: false

}
let authToken: any

const app = createServer();
describe('todo', () => {

    beforeAll(async () => {
        await mockMongoServer()
        await request(app).post('/api/auth/signup').send({
            "name": "test",
            "email": "test@gmail.com",
            "password": "test1234"
        });
        authToken = await request(app).post('/api/auth/signin').send({
            "email": "test@gmail.com",
            "password": "test1234"
        })
    }, 10000)


    afterAll(async () => {
        await closeMongoServer();
    }, 10000);

    describe('get todo route', () => {
        describe('given the product does not exist', () => {
            it('should return a 404', async () => {
                const todoId = 'todo-123';
                const response = await supertest(app)
                    .get(`/api/getToDoById$/${todoId}`)

                expect(response.status).toBe(404)

            })
        })
    });

    describe('get todo route', () => {
        describe('given the product does exist', () => {
            it('should return a 200 status and the product', async () => {
                const testTodo = new ToDo(todoPayload);
                await testTodo.save();
                console.log('here', testTodo._id)

                const response = await supertest(app)
                    .get(`/api/getToDoById/${testTodo._id}`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.status).toBe(200);
                expect(response.body.todo._id).toBe(testTodo._id.toString());

                await ToDo.deleteOne({ _id: testTodo._id });
            });
        });
    });
    describe('create todo route', () => {
        describe('given the user is not logged in ', () => {
            it('should return a 403', async () => {
                const response = await supertest(app).post('/api/createToDo');

                expect(response.status).toBe(401);

            });
        });

        describe('given the user is logged in ', () => {
            it('should return 200 and create the product', async () => {
                const response = await supertest(app).post('/api/createTodo')
                    .set('Authorization', `Bearer ${authToken.body.token}`)
                    .send(todoPayload)

                expect(response.status).toBe(201)
                expect(response.body).toBeInstanceOf(Object);
            })

        })
    });

})

