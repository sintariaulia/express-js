var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/users');

// Function Register New User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Cek email yang telah terdaftar
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        res.status(400).json();
        return;
    }

    // Hash-password dg bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save new user to database
    const newUser = {
        name,
        email,
        password: hashedPassword,
    };
    await User.create(newUser);
    res.status(201).json();
};

// Function for Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Search user with email
    const user = await User.findByEmail(email);
    if (!user) {
        res.status(401).json();
        return;
    }

    // password - hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(401).json();
        return;
    }

    // Generate token with jsonwebtoken
    const token = jwt.sign({ userId: user.id }, 'secret_key');
    res.json({ token });
};

// Protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});


module.exports = {
    registerUser,
    loginUser,
};