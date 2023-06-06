const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/auth');

// Register Router
router.post('/register', authController.registerUser);

// Login Router
router.post('/login', authController.loginUser);

// Protected route
router.get('/protected', authMiddleware, authController.getProtectedData);


module.exports = router;