var express = require('express');
var router = express.Router();

const { 
    obtenerSesion,
} = require('../middlewares/manejoSesion');

const { 
    autenticarUsuario
} = require('../middlewares/manejoAuth');

const { 
    obtenerTodosLosUsuarios, 
    mostrarLista
} = require('../middlewares/manejoListaUsuarios');

const { 
    obtenerUsuarioID,
    mostrarUsuarioID
} = require('../middlewares/manejoUsuarioID')

const { 
    editarUsuario
} = require('../middlewares/manejoEditarUsuario');

const { 
    borrarUsuario
} = require('../middlewares/manejoBorrarUsuario');

router.get('/', obtenerSesion, autenticarUsuario, obtenerTodosLosUsuarios, mostrarLista);
router.get('/editarUsuario/:id', obtenerUsuarioID, mostrarUsuarioID);
router.put('/editarUsuario/:id', editarUsuario);
router.delete('/borrarUsuario/:id', borrarUsuario);

module.exports = router;