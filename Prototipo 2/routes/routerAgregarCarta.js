var express = require('express');
var router = express.Router();

const { 
    agregarCarta,
    mostrarAgregarCarta
} = require('../middlewares/manejoAgregarCarta');

router.get('/', mostrarAgregarCarta);
router.post('/agregarCarta', agregarCarta);
router.post('/', agregarCarta);

module.exports = router;