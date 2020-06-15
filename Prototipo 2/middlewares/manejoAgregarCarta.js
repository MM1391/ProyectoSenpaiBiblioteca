const conexion = require('../services/conexionDB');

const agregarCarta = (req, res, next) => {
    const { nombreCarta , categoria, obtenida } = req.body;    
    const nuevaCarta  = {
        nombreCarta,
        categoria,
        obtenida
    };    

    conexion.query('INSERT INTO cartas SET ?', nuevaCarta,  (error, results, fields) => {
        if (error) throw error;
        res.redirect('/listadoCartas')
    });
}

const mostrarAgregarCarta = (req, res, next) => {
    res.render('agregarCarta');
}

module.exports = {
    agregarCarta,
    mostrarAgregarCarta
}