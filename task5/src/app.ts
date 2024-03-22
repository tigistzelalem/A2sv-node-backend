
import mongoose from 'mongoose';
import createServer from './utils/server';

const app = createServer();
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




