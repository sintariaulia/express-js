const connection = require('../connection');

class Pokemon {
    static async getListPokemons() {
        const [rows] = await connection.execute('SELECT * FROM pokemons');
        return rows;
    }

    static async getPokemonById(id) {
        const [rows] = await connection.execute('SELECT * FROM pokemons WHERE id = ?', [id]);
        return rows[0];
    }

    static async addPokemon(name, avatar, type, description) {
        const [result] = await connection.execute('INSERT INTO pokemons (name, avatar, type, description) VALUES (?, ?, ?, ?)', [name, avatar, type, description]);
        const id = result.insertId;
        return { id, name, avatar, type, description };
    }

    static async updatePokemon(id,name, avatar, type, description) {
        await connection.execute('UPDATE pokemons SET name = ?, avatar = ?, type = ?, description = ? WHERE id = ?', [name, avatar, type, description, id]);
        return { id, name, avatar, type, description };
    }

    static async deletePokemon(id) {
        await connection.execute('DELETE FROM pokemons WHERE id = ?', [id]);
        return true;
    }

}

module.exports = Pokemon;