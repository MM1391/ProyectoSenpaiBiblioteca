const router = require('express').Router();
//----------------------------------------------------------------------//

//-------------------------------ROUTERS--------------------------------//
const loginRouter = require('./login');

//*Usuarios*//
const usuariosRouter = require('./usuarios');

//*Cartas*//
const cartasRouter = require('./cartas');

//*Listas*//
const listasRouter = require('./listas');

//*Listas*//
const planillasRouter = require('./planillas');

//*Middlewares*//
const { apiErrorHandler } = require('../middlewares/manejoErrores');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//
//*Login*//
router.use('/login', loginRouter);

//*Usuarios*//
router.use('/usuarios', usuariosRouter);

//*Cartas*//
router.use('/cartas', cartasRouter);

//*Listas*//
router.use('/listas', listasRouter);

//*Listas*//
router.use('/planillas', planillasRouter);

//*Middlewares*//
router.use(apiErrorHandler);
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = router;