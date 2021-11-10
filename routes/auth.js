var express = require('express');
var router = express.Router();
const {auth} = require('../controllers/authController')

//autenticar con usuario y contrasenha
router.post('/', auth)

module.exports = router;