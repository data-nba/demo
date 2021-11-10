var express = require('express');
const pool = require('../db');
var router = express.Router();
var personController = require("../controllers/personController")
const {verifyToken} = require('../controllers/authController')

router.use(verifyToken)
/* listar personas con su cantidad de hijos */
router.get('/', personController.get);

//listar personas con el listado de sus hijos
router.get('/with-childs', personController.getWithChilds);

//eliminar persona
router.delete('/:id', personController.delete)

//editar persona
router.put('/:id', personController.edit)

//crear persona
router.post('/', personController.create)

module.exports = router;