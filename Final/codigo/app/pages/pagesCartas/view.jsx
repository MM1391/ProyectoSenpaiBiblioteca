const React = require('react');
const { Route } = require('react-router-dom');
//----------------------------------------------------------------------//

//-----------------------------COMPONENTES------------------------------//
const ComponenteAgregarCarta = require ('../../pages/pagesCartas/componentesCartas/agregarCarta');
const ComponenteListadoCartas = require ('../../pages/pagesCartas/componentesCartas/listadoCartas');
const ComponenteDetalleCarta = require ('../../pages/pagesCartas/componentesCartas/detalleCarta');
const ComponenteEditarCarta = require ('../../pages/pagesCartas/componentesCartas/editarCarta');
const ComponenteAgregarCartaLista = require ('../../pages/pagesCartas/componentesCartas/agregarCartaLista');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//
class PaginaListadoCartas extends React.Component {
    render() {
        const { currentUser } = this.props.initialState;
        return (            
            <React.Fragment>             
                <Route
                    exact
                    path="/agregarCarta"
                    render={(props) => <ComponenteAgregarCarta {...props}/>}
                />
                <Route
                    exact
                    path="/paginaListadoCartas"
                    render={(props) => <ComponenteListadoCartas {...props} currentUser={currentUser}/>}
                />
                <Route
                    exact
                    path="/detalleCarta/:id"
                    render={(props) => <ComponenteDetalleCarta {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/editarCarta/:id"
                    render={(props) => <ComponenteEditarCarta {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/agregarCartaLista/:id"
                    render={(props) => <ComponenteAgregarCartaLista {...props} id={props.match.params.id}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = PaginaListadoCartas;