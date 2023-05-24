var Pokemon = require('../models/pokemons');

const pokemonController = {
    getListPokemons: (req, res) => {
        const pokemon = new Pokemon();
        pokemon.getListPokemons((err, results) => {
            if (err) throw err;
            res.json({
                status_code: 200,
                message: 'Get List Pokemon Successfully',
                datas: results
            });
        });
    },

    getPokemonById: (req, res) => {
        const pokemonId = req.params.id;
        const pokemon = new Pokemon();
        pokemon.getPokemonById(pokemonId, (err, results) => {
            if (err) throw err
            if (results.length === 0) {
                res.json({
                    status_code: 404,
                    message: 'Pokemon not found',
                    datas: null
                });
            } else {
                res.json({
                    status_code: 200,
                    message: 'Get Pokemon By Id Successfully',
                    datas: results[0]
                });
            }
        });
    },

    addPokemon: (req, res) => {
        const { id, name, avatar, moves } = req.body;
        const pokemonData = { id, name, avatar, moves };
        const pokemon = new Pokemon();
        pokemon.addPokemon(pokemonData, (err, results) => {
            if (err) {
                res.json({
                    status_code: 500,
                    message: 'Error Adding Pokemon',
                    datas: null
                });
            } else {
                res.json({
                    status_code: 200,
                    message: 'Pokemon Added Successfully',
                    datas: results
                });
            }
        });
    },

    updatePokemon: (req, res) => {
        const pokemonId = req.params.id;
        const { name, avatar, moves } = req.body;
        const pokemonData = { name, avatar, moves };
        const pokemon = new Pokemon();
        pokemon.updatePokemon(pokemonId, pokemonData, (err, results) => {
            if (err) {
                res.json({
                    status_code: 500,
                    message: 'Error Updating Pokemon',
                    datas: null
                });
            } else {
                res.json({
                    status_code: 200,
                    message: 'Pokemon Ppdated successfully',
                    datas: results
                });
            }
        });
    },

    deletePokemon: (req, res) => {
        const pokemonId = req.params.id;
        const pokemon = new Pokemon();
        pokemon.deletePokemon(pokemonId, (err, results) => {
            if (err) {
                res.json({
                    status_code: 500,
                    message: 'Error Deleting Pokemon',
                    datas: null
                });
            } else {
                res.json({
                    status_code: 200,
                    message: 'Pokemon Deleted successfully',
                    datas: results
                });
            }
        });
    }








}

module.exports = pokemonController;