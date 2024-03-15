const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post("/auth/signup", userController.signup);
router.post("/auth/signin", userController.signin);

module.exports = router;