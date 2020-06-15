const conexion = require('../services/conexionDB');

const editarUsuario = (req, res, next) => {
    const idUsuarioEditar = req.params.id
    const { nombreUsuario , correo } = req.body;

    const usuarioEditar  = {
        nombreUsuario,
        correo
    };   

    conexion.query('UPDATE usuarios SET ? WHERE idCarta = ?', [usuarioEditar, idUsuarioEditar], (error, results, fields) => {
        if (error) throw error;
        res.redirect('/listaUsuarios')
    });
}

module.exports = {
    editarUsuario
}