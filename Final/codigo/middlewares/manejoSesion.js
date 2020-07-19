const obtenerSesion = (req, res, next) => {
    // console.log("entro obtenerSesion " + req.session.user.nombreUsuario);
    if (req.session.user) {
        req.nombreUsuario = req.session.user.nombreUsuario;
        next();
    } else {
        res.redirect('/login');
        console.log("no logueado");
    }
}

const borrarSesion = (req, res, next) => {
    // console.log("entro borrarSesion " + req.session.user.nombreUsuario);
    if (req.session.user) {
        req.session.destroy((err) => {
            // console.log("exito borrarSesion");
            res.redirect('/home');
        })
    } else {
        console.log("fallo borrarSesion");
    }
}

module.exports = {
    obtenerSesion,
    borrarSesion
}