const MyPokemon = require('../models/mypokemon');

const getListMyPokemons = async (req, res) => {
    try {
        const mypokemon = await MyPokemon.getListMyPokemons();
        res.json({
            status_code: 200,
            message: 'Get List My Pokemon Successfully',
            datas: mypokemon
        });
    } catch (error) {
        console.error('Error fetching My Pokemons', error);
        res.json({
            status: 500,
            error: 'Error fetching My Pokemons'
        });
    }
}

const addToMyPokemon = async (req, res) => {
    const { user_id, pokemon_id } = req.body;

    try {
        const existingUser = await MyPokemon.getMyPokemonById(pokemon_id);
        if (existingUser) {
            return res.json({
                status_code: 409,
                error: 'Pokemon is already exists'
            });
        }
        
        const mypokemon = await MyPokemon.addToMyPokemon(user_id, pokemon_id);
        res.json({
            status_code: 201,
            message: 'Add To My Pokemons Success',
            data: mypokemon
        });

    } catch (error) {
        console.error('Error creating My Pokemon', error);
        res.json({
            status_code: 500,
            error: 'Error Adding To MyPokemon'
        });
    }
}

const deleteMyPokemon = async (req, res) => {
    const { id } = req.params;
    try {
        const mypokemon = await MyPokemon.deleteMyPokemon(id);
        res.json({
            status_code: 200,
            message: 'Pokemon Deleted successfully',
            datas: mypokemon
        });
    } catch (error) {
        console.error('Error deleting Pokemon', error);
        res.json({
            status_code: 500,
            error: 'Error deleting Pokemon',
            datas: null
        });
    }
}


module.exports = {
    getListMyPokemons,
    addToMyPokemon,
    deleteMyPokemon
}