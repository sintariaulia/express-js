var connection = require('../connection');

const User = {
    create: (user) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users SET ?';
            connection.query(sql, user, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            connection.query(sql, [email], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result[0]); 
            });
        });
    },
};

module.exports = User;