var connection = require('../connection');

class MyPokemon {
    static async addToMyPokemon(user_id, pokemon_id) {
        const result = await connection.execute('INSERT INTO users_pokemons (user_id, pokemon_id) VALUES (?, ?)', [user_id, pokemon_id]);
        const id = result.insertId;
        return { id, user_id, pokemon_id };
    }

    static async getListMyPokemons() {
        const [rows] = await connection.execute('SELECT * FROM users_pokemons');
        return rows;
    }

    static async getMyPokemonById(pokemon_id) {
        const [rows] = await connection.execute('SELECT * FROM users_pokemons WHERE pokemon_id = ?', [pokemon_id]);
        return rows[0];
    }

    static async deleteMyPokemon(id) {
        await connection.execute('DELETE FROM users_pokemons WHERE id = ?', [id]);
        return true;
    }

}

module.exports = MyPokemon;