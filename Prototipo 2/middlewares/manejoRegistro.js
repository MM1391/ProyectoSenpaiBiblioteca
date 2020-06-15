const conexion = require('../services/conexionDB');
const bcrypt = require('bcrypt');

const registrarUsuario = (req, res, next) => {

    const { nombreUsuario , contrasena, correo } = req.body;
    const saltRounds = 10;

    bcrypt.hash(contrasena, saltRounds, function(err, hash) {
        const nuevoUsuario  = { 
            nombreUsuario,
            contrasena: hash,
            correo
        };

        conexion.query('INSERT INTO usuarios SET ?', nuevoUsuario,  (error, results, fields) => {
            if (error) throw error;
            res.redirect('/listaUsuarios')
        });
    });    
}

const mostrarRegistro = (req, res, next) => {
    res.render('registro');
}

module.exports = {
    registrarUsuario,
    mostrarRegistro
}