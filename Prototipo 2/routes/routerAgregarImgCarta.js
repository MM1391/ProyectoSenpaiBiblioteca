var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads' });

const { 
    agregarImgDB,
    mostrarAgregarImgCarta,
    subirImg
} = require('../middlewares/manejoAgregarImgCarta');

router.get('/:id', mostrarAgregarImgCarta);
router.post('/:id', upload.single('cartaIMG'), agregarImgDB, subirImg);

module.exports = router;