const router = require('express').Router();
// var multer  = require('multer');
// var upload = multer({ dest: '../public/uploads' });
//----------------------------------------------------------------------//

//-------------------------------ROUTERS--------------------------------//

//------------------------------PÚBLICOS--------------------------------//
//*Home*//
const HomeRouter = require('./pages/publicas');

//*Login*//
const LoginRouter = require('./pages/publicas');

//*Registro*//
const RegistroRouter = require('./pages/publicas');

//*Cartas*//
const ListadoCartasPubRouter = require('./pages/publicas/pagesCartasPub');

//*Listas*//
const ListadoListasPubRouter = require('./pages/publicas/pagesListasPub');
//----------------------------------------------------------------------//

//*Usuarios*//
const ListaUsuariosRouter = require('./pages/pagesUsuarios');

//*Cartas*//
const ListadoCartasRouter = require('./pages/pagesCartas');

//*Listas*//
const ListadoListasRouter = require('./pages/pagesListas');

//*Middlewares*//
const { appErrorHandler } = require('../middlewares/manejoErrores');
const { autenticarAdmin } = require('../middlewares/manejoAuth');
const { obtenerSesion, borrarSesion } = require('../middlewares/manejoSesion');
const { redirectHome,
        redirectRegistro,
        redirectLogin,
        redirectListadoCartas,
        redirectDetalleCarta,
        redirectListadoListas,
        redirectDetalleLista 
} = require('../middlewares/manejoRedirects');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//

//------------------------------PÚBLICAS--------------------------------//
//*Home*//
router.use('/home', redirectHome, HomeRouter);

//*Login*/
router.use('/login', redirectLogin, LoginRouter);
router.use('/logout', borrarSesion);

//*Registro*//
router.use('/registro', redirectRegistro, RegistroRouter);

//*Cartas*//
router.use('/paginaListadoCartasPub', redirectListadoCartas, ListadoCartasPubRouter);
router.use('/detalleCartasPub', redirectDetalleCarta, ListadoCartasPubRouter);

//*Listas*//
router.use('/paginaListadoListasPub', redirectListadoListas, ListadoListasPubRouter);
router.use('/detalleListaPub', redirectDetalleLista, ListadoListasPubRouter);
//----------------------------------------------------------------------//

//*Usuarios*//
router.use('/paginaListaUsuarios', obtenerSesion, autenticarAdmin, ListaUsuariosRouter);
router.use('/detalleUsuario', obtenerSesion, autenticarAdmin, ListaUsuariosRouter);
router.use('/editarUsuario', obtenerSesion, autenticarAdmin, ListaUsuariosRouter);

//*Cartas*//
// router.use('/agregarCarta', obtenerSesion, upload.single('img'), ListadoCartasRouter);
router.use('/agregarCarta', obtenerSesion, ListadoCartasRouter);
router.use('/paginaListadoCartas', obtenerSesion, ListadoCartasRouter);
router.use('/detalleCarta', obtenerSesion, ListadoCartasRouter);
router.use('/editarCarta', obtenerSesion, ListadoCartasRouter);
router.use('/agregarCartaLista', obtenerSesion, ListadoCartasRouter);

//*Listas*//
router.use('/agregarLista', obtenerSesion, ListadoListasRouter);
router.use('/paginaListadoListas', obtenerSesion, ListadoListasRouter);
router.use('/detalleLista', obtenerSesion, ListadoListasRouter);
router.use('/editarLista', obtenerSesion, ListadoListasRouter);
router.use('/contenidoLista', obtenerSesion, ListadoListasRouter);

//*Middlewares*//
router.use(appErrorHandler);
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = router;