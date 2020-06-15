const conexion = require('../services/conexionDB');

const obtenerTodosLosUsuarios = (req, res, next) => {
    conexion.query("SELECT * FROM usuarios", (err, result, fields) => {
        if (err) {
            throw err;
        } else {
            res.listaUsuarios = result;
            next();
        }
    });
}

const mostrarLista = (req, res, next) => {
    res.render('listaUsuarios',{
        listaUsuarios: res.listaUsuarios
    });
}

module.exports = {
    obtenerTodosLosUsuarios,
    mostrarLista
}