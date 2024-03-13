const express = require('express')
const router = express.Router();
const itemController = require('../controller/item_controller')

router.post('/createItem', itemController.createItem);

module.exports = router