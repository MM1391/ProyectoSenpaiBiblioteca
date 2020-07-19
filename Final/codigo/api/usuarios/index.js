const router = require('express').Router();
const Usuario = require('../../models/modeloUsuario');
var crypto = require('crypto');
//----------------------------------------------------------------------//

//----------------------------CREATE USUARIO----------------------------//
router.post('/', (req, res, next) => {    
    const usuario = new Usuario(null, req.body.nombreUsuario, 
        crypto.createHash('md5').update(req.body.contrasena).digest("hex"), req.body.correo, req.body.fotoPerfil);
    
    usuario.save()  
    .then(result => {
        req.session.user = {
            nombreUsuario: req.body.nombreUsuario
        };            
        res.json({
            result,                
        });         
    })
    .catch(err => {
        next(err);
    });
});
//----------------------------------------------------------------------//

//---------------------------GET ALL USUARIOS---------------------------//
router.get('/', (req, res, next) => {
    Usuario.obtenerTodosUsuarios()
        .then(usuarios => {
            res.json({
                usuarios,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//-----------------------------GET USUARIO------------------------------//
router.get('/:id', (req, res, next) => {
    Usuario.obtenerUsuarioID(req.params.id)
        .then(usuario => {
            res.json({
                usuario,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//----------------------------UPDATE USUARIO----------------------------//
router.put('/:id', (req, res, next) => {
    Usuario.editarUsuario(req.body.nombreUsuario, crypto.createHash('md5').update(req.body.contrasena).digest("hex"), 
        req.body.correo, req.body.fotoPerfil, req.params.id)
        .then(usuario => {
            res.json({
                usuario,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//----------------------------DELETE USUARIO----------------------------//
router.delete('/:id', (req, res, next) => {
    Usuario.borrarUsuario(req.params.id)
        .then(usuario => {
            res.status(200).json({});
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = router;