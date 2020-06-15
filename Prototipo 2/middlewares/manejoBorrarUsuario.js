const conexion = require('../services/conexionDB');

const borrarUsuario = (req, res, next) => {
    const idUsuarioBorrar = req.params.id;

    conexion.query('DELETE FROM usuarios WHERE idUsuario = ?', idUsuarioBorrar,  (error, results, fields) => {
        if (error) throw error;
        res.redirect('/listaUsuarios')
    });
}

module.exports = {
    borrarUsuario
}