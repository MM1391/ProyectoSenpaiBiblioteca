const conexion = require('../services/conexionDB');

const obtenerUsuarioID = (req, res, next) => {
    const idUsuario = req.params.id 
    
    conexion.query("SELECT * FROM usuarios WHERE idUsuario = ?", idUsuario, (err, result, fields) => {
        if (err) {
            throw err;
        } else {
            res.editarUsuario = result;
            next();
        }
    });
}

const mostrarUsuarioID = (req, res, next) => {
    res.render('editarUsuario',{
        editarUsuario: res.editarUsuario
    });
}

module.exports = {
    obtenerUsuarioID,
    mostrarUsuarioID
}