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

module.exports = router;
