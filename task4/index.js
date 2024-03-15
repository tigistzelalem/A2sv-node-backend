const mongoose = require('mongoose');
const express = require('express');
const taskRoute = require('./route/task_route');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://127.0.0.1:27017/auth", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000);
        console.log('connected')
    })
    .catch((error) => {
        console.log(error)
    })


app.use('/api', taskRoute);



  