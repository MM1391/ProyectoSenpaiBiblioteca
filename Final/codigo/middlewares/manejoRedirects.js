const redirectHome = (req, res, next) => {
    if (req.session.user) {
        if (req.nombreUsuario = req.session.user.nombreUsuario) {
            res.redirect('/paginaListaUsuarios');        
        } else {
            console.log("fallo redirectHome");
        }
    } else {        
        next();
    }
}

const redirectRegistro = (req, res, next) => {
    if (req.session.user) {
        if (req.nombreUsuario = req.session.user.nombreUsuario) {
            res.redirect('/paginaListaUsuarios');        
        } else {
            console.log("fallo redirectRegistro");
        }
    } else {       
        next();
    }
}

const redirectLogin = (req, res, next) => {
    if (req.session.user) {
        if (req.nombreUsuario = req.session.user.nombreUsuario) {
            res.redirect('/paginaListaUsuarios');        
        } else {
            console.log("fallo redirectLogin");
        }
    } else {
        next();        
    }
}

const redirectListadoCartas = (req, res, next) => {
    if (req.session.user) {
        if (req.nombreUsuario = req.session.user.nombreUsuario) {
            res.redirect('/paginaListadoCartas');        
        } else {
            console.log("fallo redirectListadoCartas");
        }
    } else {
        next();        
    }
}

const redirectDetalleCarta = (req, res, next) => {
    if (req.session.user) {
        if (req.nombreUsuario = req.session.user.nombreUsuario) {
            res.redirect(`/detalleCarta/${req.params.id}`);        
        } else {
            console.log("fallo redirectDetalleCarta");
        }
    } else {
        next();        
    }
}

const redirectListadoListas = (req, res, next) => {
    if (req.session.user) {
        if (req.nombreUsuario = req.session.user.nombreUsuario) {
            res.redirect('/paginaListadoListas');        
        } else {
            console.log("fallo redirectListadoListas");
        }
    } else {
        next();        
    }
}

const redirectDetalleLista = (req, res, next) => {
    if (req.session.user) {
        if (req.nombreUsuario = req.session.user.nombreUsuario) {
            res.redirect(`/detalleLista/${req.params.id}`);        
        } else {
            console.log("fallo redirectDetalleLista");
        }
    } else {
        next();        
    }
}

module.exports = {
    redirectHome,
    redirectRegistro,
    redirectLogin,
    redirectListadoCartas,
    redirectDetalleCarta,
    redirectListadoListas,
    redirectDetalleLista
}