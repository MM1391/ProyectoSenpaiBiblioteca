var express = require('express');
var router = express.Router();

const { 
    loginUsuario,
    mostrarLogin
} = require('../middlewares/manejoLogin');

router.post('/', loginUsuario);
router.get('/', mostrarLogin);

module.exports = router;