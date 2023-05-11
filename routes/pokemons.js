var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/pokemon', (req, res) => {
  const sql = 'SELECT * FROM pokemons';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get('/pokemon/:id', (req, res) => {
  const pokemonId = req.params.id
  const sql = 'SELECT * FROM pokemons WHERE id = ?';
  connection.query(sql, [pokemonId], (err, results) => {
    if (err) throw err
    if (results.length === 0) {
      res.status(404).json({ message: 'Pokemon not found' });
      return;
    }
    res.json(results[0]);
  });
});

router.post('/pokemon', (req, res) => {
  const { id, name, avatar, moves } = req.body;
  const sql = 'INSERT INTO pokemons (id, name, avatar, moves) VALUES (?, ?, ?, ?)';
  connection.query(sql, [id, name, avatar, moves], (err, results) => {
    res.send({
      results,
      message: 'Pokemon added successfully'
    });
  });
});

router.put('/pokemon/:id', (req, res) => {
  const pokemonId = req.params.id
  const { name, avatar, moves } = req.body
  const sql = 'UPDATE pokemons SET name = ?, avatar = ?, moves = ? WHERE id = ?';
  connection.query(sql, [name, avatar, moves, pokemonId], (err, results) => {
    if (err) throw err;
    res.send({
      results,
      message: 'Pokemon Update successfully'
    });
  });
});

router.delete('/pokemon/:id', (req, res) => {
  const pokemonId = req.params.id
  const sql = 'DELETE FROM pokemons WHERE id = ?';
  connection.query(sql, [pokemonId], (err, results) => {
    if (err) throw err;
    res.json({
      results,
      message: 'Pokemon delete successfully'
    });
  });
});



module.exports = router;