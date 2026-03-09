const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
// const authController = require()


router.post('/register', authController.register);
router.post('/login', authController.login);

// Register user

module.exports = router