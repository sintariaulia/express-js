var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var User = require('../models/auth');

// Function Register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findByEmail(email);  // Check if email already exists
        if (existingUser) {
            return res.json({
                status_code: 409,
                error: 'Email already exists'
            });
        }
        const user = await User.createUser(name, email, password);
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

    try {
        const user = await User.findByEmail(email);    // Search User By Email
        if (!user) {
            return res.json({
                status_code: 401,
                error: 'Invalid Credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);   // Compare password - hashed password in database
        if (!isPasswordValid) {
            return res.json({
                status_code: 401,
                message: 'Invalid Credential'
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });  // Generate token JWT
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