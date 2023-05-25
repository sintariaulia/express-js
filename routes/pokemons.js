var express = require('express');
var router = express.Router();
var pokemonController = require('../controllers/pokemons');
var myPokemonController = require('../controllers/mypokemons');

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