const conexion = require('../services/conexionDB');

const borrarCarta = (req, res, next) => {
    const idCartaBorrar = req.params.id;

    conexion.query('DELETE FROM cartas WHERE idCarta = ?', idCartaBorrar,  (error, results, fields) => {
        if (error) throw error;
        res.redirect('/listadoCartas')
    });
}

module.exports = {
    borrarCarta
}