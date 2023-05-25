var express = require('express');
var router = express.Router();
var pokemonController = require('../controllers/pokemons');

router.get('/pokemon', pokemonController.getListPokemons);
// router.get('/pokemon', authMiddleware, pokemonController.getListPokemons);

router.get('/pokemon/:id', pokemonController.getPokemonById);

router.post('/pokemon', pokemonController.addPokemon);

router.put('/pokemon/:id', pokemonController.updatePokemon);

router.delete('/pokemon/:id', pokemonController.deletePokemon);


module.exports = router;