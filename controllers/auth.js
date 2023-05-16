var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/users');

// Fungsi untuk mendaftarkan pengguna baru
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Cek apakah email sudah terpakai
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        res.status(400).json({ message: 'Email already exists' });
        return;
    }

    // Hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database
    const newUser = {
        name,
        email,
        password: hashedPassword,
    };
    await User.create(newUser);

    res.status(201).json({ message: 'Register successfully' });
};

// Fungsi untuk login pengguna
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findByEmail(email);

    if (!user) {
        res.status(401).json({ message: 'Invalid e-mail' });
        return;
    }

    // Bandingkan password yang dimasukkan dengan hashed password di database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid password' });
        return;
    }

    // Generate token menggunakan jsonwebtoken
    const token = jwt.sign({ userId: user.id }, 'secret_key');

    res.json({ token });
};

module.exports = {
    registerUser,
    loginUser,
};