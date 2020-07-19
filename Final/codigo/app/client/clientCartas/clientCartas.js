const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const PaginaListadoCartas = require('../../../app/pages/pagesCartas/view');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <PaginaListadoCartas initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);