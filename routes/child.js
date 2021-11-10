var express = require('express');
var router = express.Router();
const db = require('../db')
const childController = require("../controllers/childController")

const {verifyToken} = require('../controllers/authController')

router.use(verifyToken)
//eliminar hijo
router.delete('/:id', childController.delete)


//crear hijo
router.post('/', childController.create)

module.exports = router;