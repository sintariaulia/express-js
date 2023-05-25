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

    // addToMyPokemon: (id, userId, pokemonId, callback) => {
    //     const sql = 'INSERT INTO users_pokemons (id, user_id, pokemon_id) VALUES (?, ?)';
    //     connection.query(sql, [id, userId, pokemonId], callback);
    // }

    // addToMyPokemon: (userId, pokemonId) => {
    //     return new Promise((resolve, reject) => {
    //         const sql = 'INSERT INTO users_pokemons (user_id, pokemon_id) VALUES (?, ?)';
    //         connection.query(sql, [userId, pokemonId], (err, result) => {
    //             if (err) {
    //                 reject(err);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     });
    // },


};


module.exports = User;