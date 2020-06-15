const path = require('path');
const conexion = require('../services/conexionDB');

const agregarImgDB = (req, res, next) => {
    const cartaID = req.params.id;
    const imagen  = { cartaID };

    if (req.file) {
        Object.assign(imagen, {
            img:  req.file.filename,
        });
    };

    conexion.query('INSERT INTO carta_imgs SET ?', imagen,  (error, results, fields) => {
        if (error) throw error;
        res.redirect('/listadoCartas')
    });
}

const subirImg = (req, res, next) => {
    res.sendFile(req.params.id, { root: path.join(__dirname, 'public/uploads') });
}

const mostrarAgregarImgCarta = (req, res, next) => {
    res.render('agregarImgCarta');
}

module.exports = {
    agregarImgDB,    
    subirImg,
    mostrarAgregarImgCarta
}