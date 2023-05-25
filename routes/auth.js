var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/auth');
var authController = require('../controllers/auth');

// Register Router
router.post('/register', authController.registerUser);

// Login Router
router.post('/login', authController.loginUser);

// Protected route
router.get('/protected', authMiddleware, authController.getProtectedData);


module.exports = router;