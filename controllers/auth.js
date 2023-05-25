var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/users');

// Function Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if email already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const newUser = {
            name,
            email,
            password: hashedPassword
        };
        await User.create(newUser);
        res.status(201).json({ message: 'Register successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function for Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Search User By Email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credential' });
        }
        // Compare password - hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credential' });
        }
        // Generate token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
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