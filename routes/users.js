var express = require('express');
var router = express.Router();
var connection = require('../connection')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json({
      status_code: 200,
      message: 'Get All User Successfully',
      datas: results
    });
  });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  connection.query(sql, [userId], (err, results) => {
    if (results.length === 0) {
      res.json({
        status_code: 404,
        message: 'Pokemon not found',
        datas: null
      });
    } else {
      res.json({
        status_code: 200,
        message: 'Get User By Id Successfully',
        datas: results[0]
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      res.json({
        status_code: 500,
        message: 'Error Deleting User',
        datas: null
      });
    } else {
      res.json({
        status_code: 200,
        message: 'User Deleted successfully',
        datas: results
      });
    }
  });
});




module.exports = router;
