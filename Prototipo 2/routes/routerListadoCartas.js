var express = require('express');
var router = express.Router();

const { 
    obtenerSesion,
} = require('../middlewares/manejoSesion');

const { 
    autenticarUsuario
} = require('../middlewares/manejoAuth');

const { 
    obtenerTodasLasCartas, 
    mostrarListado
} = require('../middlewares/manejoListadoCartas');

const { 
    obtenerCartaID,
    mostrarCartaID
} = require('../middlewares/manejoCartaID')

const { 
    editarCarta
} = require('../middlewares/manejoEditarCarta');

const { 
    borrarCarta
} = require('../middlewares/manejoBorrarCarta');

router.get('/', obtenerSesion, autenticarUsuario, obtenerTodasLasCartas, mostrarListado);
router.get('/editarCarta/:id', obtenerCartaID, mostrarCartaID);
router.put('/editarCarta/:id', editarCarta);
router.delete('/:id', borrarCarta);

module.exports = router;