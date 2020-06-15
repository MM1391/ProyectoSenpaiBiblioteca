const conexion = require('../services/conexionDB');

const obtenerTodasLasCartas = (req, res, next) => {
    conexion.query("SELECT * FROM cartas", (err, result, fields) => {
        if (err) {
            throw err;
        } else {
            res.listadoCartas = result;
            next();
        }
    });
}

const mostrarListado = (req, res, next) => {
    res.render('listadoCartas',{
        listadoCartas: res.listadoCartas
    });
}

module.exports = {
    obtenerTodasLasCartas,
    mostrarListado
}