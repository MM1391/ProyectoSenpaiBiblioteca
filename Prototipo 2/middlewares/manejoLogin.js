const conexion = require('../services/conexionDB');
const bcrypt = require('bcrypt');

const loginUsuario = (req, res, next) => {
    const { nombreUsuario, contrasena } = req.body;

    conexion.query("SELECT contrasena FROM usuarios WHERE nombreUsuario = ?", [nombreUsuario], (err, result, fields) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                console.log(result[0].contrasena);
                bcrypt.compare(contrasena, result[0].contrasena, function (err, compareResult) {
                    if (compareResult) {
                        req.session.nombreUsuario = nombreUsuario;
                        res.redirect('/listadoCartas');
                    } else {
                        res.render("login", {
                            mensaje: 'Usuario y/o contraseña incorrecta.'
                        });
                    }
                });
            } else {
                res.render("login", {mensaje: 'Usuario y/o contraseña incorrecta.'});
            }
        }
    });
}

const mostrarLogin = (req, res, next) => {
    res.render('login', {mensaje: null});
}

module.exports = {
    loginUsuario,
    mostrarLogin
}