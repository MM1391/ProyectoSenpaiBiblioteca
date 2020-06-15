const express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');

//const apiRouter = require('./api');

const app = express();

const routerHome = require('./routes/routerHome');
const routerLogin = require('./routes/routerLogin');
const routerRegistro = require('./routes/routerRegistro');
const routerListaUsuarios = require('./routes/routerListaUsuarios');
const routerListadoCartas = require('./routes/routerListadoCartas');
const routerAgregarCarta = require('./routes/routerAgregarCarta');
const routerAgregarImgCarta = require('./routes/routerAgregarImgCarta');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(session({
    secret: 'my secret',
    cookie: {maxAge: 43200000},
    resave: false,
    saveUninitialized: true
}));

app.use('/home', routerHome);
app.use('/login', routerLogin);
app.use('/registro', routerRegistro);
app.use('/listaUsuarios', routerListaUsuarios);
app.use('/listadoCartas', routerListadoCartas);
app.use('/agregarCarta', routerAgregarCarta);
app.use('/agregarImgCarta', routerAgregarImgCarta);

//app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Servidor corriendo');
});