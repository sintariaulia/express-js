var connection = require('../connection');

class Pokemon {
    getListPokemons(callback) {
        const sql = 'SELECT * FROM pokemons';
        connection.query(sql, callback);
    }

    getPokemonById(id, callback) {
        const sql = 'SELECT * FROM pokemons WHERE id = ?';
        connection.query(sql, [id], callback);
    }

    addPokemon(pokemonData, callback) {
        const { id, name, avatar, moves } = pokemonData;
        const sql = 'INSERT INTO pokemons (id, name, avatar, moves) VALUES (?, ?, ?, ?)';
        connection.query(sql, [id, name, avatar, moves], callback);
    }

    updatePokemon(id, pokemonData, callback) {
        const { name, avatar, moves } = pokemonData;
        const sql = 'UPDATE pokemons SET name = ?, avatar = ?, moves = ? WHERE id = ?';
        connection.query(sql, [name, avatar, moves, id], callback);
    }

    deletePokemon(id, callback) {
        const sql = 'DELETE FROM pokemons WHERE id = ?';
        connection.query(sql, [id], callback);
    }

}

module.exports = Pokemon;