require('@babel/register')({
  ignore: ['node_modules'],
});

const express = require('express');
const config = require('./config');
const apiRouter = require('./api');
const appRouter = require('./app');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const DIR = './uploads';

const app = express();

// Configuraciones de express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(express.static(config.static));

// Configuración de express-session
app.use(session({
  secret: 'my secret',
  cookie: {maxAge: 43200000},
  resave: false,
  saveUninitialized: true
}));

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({storage: storage});

// Asignar middlewares globales
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Definir Routers API y App
app.use('/api', apiRouter);
app.use(appRouter);

app.listen(config.PORT, () => {
    console.log('Servidor corriendo')
});