var connection = require('../connection');

class Pokemon {
    // Models Pokemon
    static async getListPokemons() {
        const [rows] = await connection.execute('SELECT * FROM pokemons');
        return rows;
    }

    static async getPokemonById(id) {
        const [rows] = await connection.execute('SELECT * FROM pokemons WHERE id = ?', [id]);
        return rows[0];
    }

    static async addPokemon(name, avatar, moves) {
        const [result] = await connection.execute('INSERT INTO pokemons (name, avatar, moves) VALUES (?, ?, ?)', [name, avatar, moves]);
        const id = result.insertId;
        return { id, name, avatar, moves };
    }

    static async updatePokemon(id, name, avatar, moves) {
        await connection.execute('UPDATE pokemons SET name = ?, avatar = ?, moves = ? WHERE id = ?', [name, avatar, moves, id]);
        return { id, name, avatar, moves };
    }

    static async deletePokemon(id) {
        await connection.execute('DELETE FROM pokemons WHERE id = ?', [id]);
        return true;
    }

}

module.exports = Pokemon;