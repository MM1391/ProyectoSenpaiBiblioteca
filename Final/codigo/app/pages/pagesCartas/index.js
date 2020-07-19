const router = require('express').Router();
const React = require('react');
const { StaticRouter } = require('react-router-dom');
const { renderToString } = require('react-dom/server');

//Recursos locales
const View = require('./view');

//Render template
router.get('/*', (req, res, next) => {
    const initialState = {
        currentUser: req.session.user.nombreUsuario
    }
    const context = {};

    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <View initialState={initialState}/>
        </StaticRouter>
    );

    res.render('template', {
        pageName: 'listadoCartas',
        pageTitle: 'Listado de Cartas',
        host: 'http://localhost:3000',
        initialState,
        content
    });
});

module.exports = router;