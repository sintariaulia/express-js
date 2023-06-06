const connection = require('../connection');

class User {
    static async getAllUsers() {
        const [rows] = await connection.execute('SELECT * FROM users');
        return rows;
    }

    static async getUserById(id) {
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async deleteUser(id) {
        await connection.execute('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }

}

module.exports = User;