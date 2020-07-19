const router = require('express').Router();
// const path = require('path');
const Carta = require('../../models/modeloCarta');
//----------------------------------------------------------------------//

//-----------------------------CREATE CARTA-----------------------------//
router.post('/', (req, res, next) => {
    console.log(req.body);

    const carta = new Carta(null, req.body.nombreCarta, req.body.tipo, req.body.enColeccion, 
        req.body.img, req.body.firstEd, req.body.firstEdStatus, req.body.region);
        
    carta.save()
    .then(carta => {
        //res.sendFile(carta.idCarta, { root: path.join(__dirname, '../../public/uploads') });        
        res.json({
            carta,
        });
    })
    .catch(err => {
        next(err);
    });
});
//----------------------------------------------------------------------//

//----------------------------GET ALL CARTAS----------------------------//
router.get('/', (req, res, next) => {
    Carta.obtenerTodasCartas()
        .then(cartas => {
            res.json({
                cartas,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//------------------------------GET CARTA-------------------------------//
router.get('/:id', (req, res, next) => {
    Carta.obtenerCartaID(req.params.id)
        .then(carta => {
            res.json({
                carta,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//-----------------------------UPDATE CARTA-----------------------------//
router.put('/:id', (req, res, next) => {
    Carta.editarCarta(req.body.nombreCarta, req.body.tipo, req.body.enColeccion, req.body.img,
        req.body.firstEd, req.body.firstEdStatus, req.body.region, req.params.id)
        .then(carta => {
            res.json({
                carta,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//-----------------------------DELETE CARTA-----------------------------//
router.delete('/:id', (req, res, next) => {
    Carta.borrarCarta(req.params.id)
        .then(carta => {            
            res.status(200).json({});
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = router;