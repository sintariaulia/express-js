const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemons');
const myPokemonController = require('../controllers/mypokemons');

const authTokenMiddeleware = require('../middleware/auth')

router.get('/pokemons', pokemonController.getListPokemons);
// router.get('/pokemon', authMiddleware, pokemonController.getListPokemons);
router.get('/pokemons/collection', myPokemonController.getListMyPokemons);

router.get('/pokemons/:id', pokemonController.getPokemonById);

router.post('/pokemons', pokemonController.addPokemon);
router.post('/pokemons/collection', myPokemonController.addToMyPokemon);

router.put('/pokemons/:id', pokemonController.updatePokemon);

router.delete('/pokemons/:id', pokemonController.deletePokemon);
router.delete('/pokemons/collection/:id', myPokemonController.deleteMyPokemon);


module.exports = router;