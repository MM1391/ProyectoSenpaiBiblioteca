const autenticarUsuario = (req, res, next) => {
    if(req.nombreUsuario == 'Admin'){
    next();
    } else {
        res.render("accesoDenegado");
    }     
}

module.exports = {
    autenticarUsuario
}