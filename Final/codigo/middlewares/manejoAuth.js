const autenticarAdmin = (req, res, next) => {
    if(req.session.user.nombreUsuario == 'admin'){
        next();
    } else {
        res.redirect("/paginaListadoCartas");
        console.log("no autorizado");
    }     
}

module.exports = {
    autenticarAdmin
}