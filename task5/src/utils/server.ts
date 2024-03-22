import express from 'express';
import bodyParser from 'body-parser';
import todoRoute from '../routes/todoRoute';
import userRoute from '../routes/user_route';
import errorHandler from '../middleware/error';

function createServer() {

    const app = express();
    app.use(bodyParser.json());
    app.use('/api', todoRoute);
    app.use('/api', userRoute);
    app.use(errorHandler)
       
    return app

    }

export default createServer