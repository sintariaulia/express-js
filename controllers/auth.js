require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthUser = require('../models/auth')

// Function Register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await AuthUser.findByEmail(email);  // Check if email already exists
        if (existingUser) {
            return res.json({
                status_code: 409,
                error: 'Email already exists'
            });
        }
        const user = await AuthUser.createUser(name, email, password);
        res.json({
            status_code: 201,
            message: 'Register successfully',
            user
        });
    } catch (error) {
        console.log('Error registering user', error);
        res.json({
            status_code: 500,
            error: 'Internal server error'
        });
    }
};

// Function for Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password, "Test");

    try {
        const user = await AuthUser.findByEmail(email);   // Search User By Email
        console.log("User :", user);

        if (!user) {
            return res.json({
                status_code: 404,
                message: 'User Not Found'
            });
        }

        const passwordValid = await bcrypt.compare(password, user.password);   // Compare password - hashed password in database
        console.log("Test Password", passwordValid);

        if (!passwordValid) {
            return res.json({
                status_code: 401,
                message: 'Invalid Credential'
            });
        }

        const token = jwt.sign({ userId: user.id }, 'test', { expiresIn: '1h' });  // Generate token JWT When Success Login
        res.json({
            status_code: 200,
            message: 'Login successful',
            id: user.id,
            token
        });

    } catch (error) {
        console.error('Error logging in', error);
        res.json({
            status_code: 500,
            error: 'Error logging in'
        });
    }
};

// Function Protected route
const getProtectedData = (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
}


module.exports = {
    registerUser,
    loginUser,
    getProtectedData,
};