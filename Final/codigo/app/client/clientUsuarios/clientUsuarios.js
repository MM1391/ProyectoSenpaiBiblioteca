const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const PaginaListaUsuarios = require('../../../app/pages/pagesUsuarios/view');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <PaginaListaUsuarios initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);