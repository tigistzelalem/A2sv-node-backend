const mongoose = require('mongoose');
const express = require('express');
const itemRoute = require('./route/item_route');
const cartRoute = require('./route/cart_route')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://127.0.0.1:27017/interview", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000);
        console.log('connected')
    })
    .catch((error) => {
        console.log(error)
    })

app.use('/item', itemRoute);
app.use('/cart', cartRoute);


  