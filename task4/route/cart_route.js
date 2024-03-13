const cartController = require('../controller/cart_controller');
const express = require('express');
const router = express.Router();

router.get('/getCart', cartController.getCart);
router.post('/addItem', cartController.addItemToCart);

module.exports = router