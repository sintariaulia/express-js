const Pokemon = require('../models/pokemon');

exports.getListPokemons = async (req, res) => {
    try {
        const pokemon = await Pokemon.getListPokemons();
        res.json({
            status_code: 200,
            message: 'Get List Pokemon Successfully',
            datas: pokemon
        });
    } catch (error) {
        console.error('Error fetching Pokemons', error);
        res.json({
            status: 500,
            error: 'Error fetching Pokemons'
        });
    }
};

exports.getPokemonById = async (req, res) => {
    const { id } = req.params;
    try {
        const pokemon = await Pokemon.getPokemonById(id);
        if (pokemon) {
            res.json({
                status_code: 200,
                message: 'Get Pokemon By Id Successfully',
                datas: pokemon
            });
        } else {
            res.json({
                status_code: 404,
                message: 'Pokemon not found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error fetching Pokemon', error);
        res.json({
            status: 500,
            error: 'Error fetching Pokemon',
        });
    }
};

exports.addPokemon = async (req, res) => {
    const { name, avatar, type, description } = req.body;
    try {
        const pokemon = await Pokemon.addPokemon(name, avatar, type, description);
        res.json({
            status_code: 201,
            message: 'Pokemon Added Successfully',
            datas: pokemon
        });
    } catch (error) {
        console.error('Error creating Pokemon', error);
        res.json({
            status_code: 500,
            error: 'Error Adding Pokemon'
        });
    }
};

exports.updatePokemon = async (req, res) => {
    const { id } = req.params;
    const { name, avatar, type, description } = req.body;
    try {
        const pokemon = await Pokemon.updatePokemon(id, name, avatar, type, description);
        res.json({
            status_code: 204,
            message: 'Pokemon Updated successfully',
            datas: pokemon
        });
    } catch (error) {
        console.error('Error Updating Pokemon', error);
        res.json({
            status_code: 500,
            error: 'Error Updating Pokemon'
        });
    }
};

exports.deletePokemon = async (req, res) => {
    const { id } = req.params;
    try {
        const pokemon = await Pokemon.deletePokemon(id);
        res.json({
            status_code: 204,
            message: 'Pokemon Deleted successfully',
            datas: pokemon
        });
    } catch (error) {
        console.error('Error deleting Pokemon', error);
        res.json({
            status_code: 500,
            error: 'Error deleting Pokemon',
            datas: null
        });
    }
};
