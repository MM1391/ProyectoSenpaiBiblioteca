const conexion = require('../services/conexionDB');

const editarCarta = (req, res, next) => {
    const idCartaEditar = req.params.id
    const { nombreCarta , categoria, obtenida } = req.body;

    const cartaEditar  = {
        nombreCarta,
        categoria,
        obtenida
    };   

    conexion.query('UPDATE cartas SET ? WHERE idCarta = ?', [cartaEditar, idCartaEditar], (error, results, fields) => {
        if (error) throw error;
        res.redirect('/listadoCartas')
    });
}

module.exports = {
    editarCarta
}