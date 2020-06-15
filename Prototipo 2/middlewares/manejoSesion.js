const obtenerSesion = (req, res, next) => {
    if (req.session.nombreUsuario) {
        req.nombreUsuario = req.session.nombreUsuario;
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    obtenerSesion
}