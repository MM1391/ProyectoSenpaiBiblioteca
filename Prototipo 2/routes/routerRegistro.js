var express = require('express');
var router = express.Router();

const { 
    registrarUsuario,
    mostrarRegistro
} = require('../middlewares/manejoRegistro');

router.post('/', registrarUsuario);
router.get('/', mostrarRegistro);

module.exports = router;