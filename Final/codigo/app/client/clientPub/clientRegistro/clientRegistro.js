const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const PaginaRegistro = require('../../../pages/publicas/view');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <PaginaRegistro initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);