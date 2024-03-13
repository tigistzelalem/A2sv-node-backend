import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoute'

const app = express();

app.use(bodyParser.json());
app.use('/api', todoRoutes);

mongoose.connect('mongodb://localhost:27017/todoListDB')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
