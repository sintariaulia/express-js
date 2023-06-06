const connection = require('../connection');
const bcrypt = require('bcrypt');

class User  {
    static async createUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);   // Hash Password
        const [result] = await connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
            name,
            email,
            hashedPassword,
        ]);
        const id = result.insertId;
        return { id, name, email };
    }

    static async findByEmail(email) {
        const [user] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        return user[0];
    }

};


module.exports = User;