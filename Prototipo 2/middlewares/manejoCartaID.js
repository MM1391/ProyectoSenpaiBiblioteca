const conexion = require('../services/conexionDB');

const obtenerCartaID = (req, res, next) => {
    const idCarta = req.params.id 
    
    conexion.query("SELECT * FROM cartas WHERE idCarta = ?", idCarta, (err, result, fields) => {
        if (err) {
            throw err;
        } else {
            res.editarCarta = result;
            next();
        }
    });
}

const mostrarCartaID = (req, res, next) => {
    res.render('editarCarta',{
        editarCarta: res.editarCarta
    });
}

module.exports = {
    obtenerCartaID,
    mostrarCartaID
}