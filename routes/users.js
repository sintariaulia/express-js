var express = require('express');
var router = express.Router();
const userControler = require('../controllers/users');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/users', userControler.getAllUsers);

router.get('/users/:id', userControler.getUserById);

router.delete('/users/:id', userControler.deleteUser);


module.exports = router;