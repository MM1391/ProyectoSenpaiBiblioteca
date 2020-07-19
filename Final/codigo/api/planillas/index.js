const router = require('express').Router();
const Planilla = require('../../models/modeloPlanilla');
//----------------------------------------------------------------------//

//------------------------AGREGAR CARTA A LISTA-------------------------//
router.post('/:id', (req, res, next) => {
    const planilla = new Planilla(null, req.body.idCartaAsoc, req.body.idListaAsoc);

    planilla.save()
    .then(planilla => {
        res.json({
            planilla,
        });
    })
    .catch(err => {
        next(err);
    });
});
//----------------------------------------------------------------------//

//-----------------------GET CARTAS WHERE ID LISTA----------------------//
router.get('/:id', (req, res, next) => {
    Planilla.obtenerCartasIDLista(req.params.id)
        .then(planilla => {
            res.json({
                planilla,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = router;