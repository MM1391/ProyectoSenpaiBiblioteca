const router = require('express').Router();
const Lista = require('../../models/modeloLista');
//----------------------------------------------------------------------//

//-----------------------------CREATE LISTA-----------------------------//
router.post('/', (req, res, next) => {
    const lista = new Lista(null, req.body.nombreLista);

    lista.save()
    .then(lista => {
        res.json({
            lista,
        });
    })
    .catch(err => {
        next(err);
    });
});
//----------------------------------------------------------------------//

//----------------------------GET ALL LISTAS----------------------------//
router.get('/', (req, res, next) => {
    Lista.obtenerTodasListas()
        .then(listas => {
            res.json({
                listas,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//------------------------------GET LISTA-------------------------------//
router.get('/:id', (req, res, next) => {
    Lista.obtenerListaID(req.params.id)
        .then(lista => {
            res.json({
                lista,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//-----------------------------UPDATE LISTA-----------------------------//
router.put('/:id', (req, res, next) => {
    Lista.editarLista(req.body.nombreLista, req.params.id)
        .then(lista => {
            res.json({
                lista,
            });
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//-----------------------------DELETE LISTA-----------------------------//
router.delete('/:id', (req, res, next) => {
    Lista.borrarLista(req.params.id)
        .then(lista => {
            res.status(200).json({});
        })
        .catch(err => {
            next(err);
        });
});
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = router;