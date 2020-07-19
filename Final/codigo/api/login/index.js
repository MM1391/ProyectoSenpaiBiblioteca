const router = require('express').Router();
const Usuario = require('../../models/modeloUsuario');
//----------------------------------------------------------------------//

//--------------------------------LOGIN---------------------------------//
router.post('/', (req, res, next) => {
    Usuario.login(req.body.nombreUsuario, req.body.contrasena)          
        .then(result => {
            if(result.success == 'true'){
                req.session.user = {
                    nombreUsuario: req.body.nombreUsuario
                };
            }            
            res.json({
                result,                
            });         
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//--------------------------------LOGOUT--------------------------------//
router.post('/logout', (req, res, next) => {
    Usuario.login(req.body.nombreUsuario, req.body.contrasena)          
        .then(result => {
            if(result.success == 'true'){
                req.session.user = {
                    nombreUsuario: ''
                };
            }            
            res.json({
                result,                
            });         
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//


//----------------------------------------------------------------------//
module.exports = router;