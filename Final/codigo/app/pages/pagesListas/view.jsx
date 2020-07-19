const React = require('react');
const { Route } = require('react-router-dom');
//----------------------------------------------------------------------//

//-----------------------------COMPONENTES------------------------------//
const ComponenteAgregarLista = require ('../../pages/pagesListas/componentesListas/agregarLista');
const ComponenteListadoListas = require ('../../pages/pagesListas/componentesListas/listadoListas');
const ComponenteDetalleLista = require ('../../pages/pagesListas/componentesListas/detalleLista');
const ComponenteEditarLista = require ('../../pages/pagesListas/componentesListas/editarLista');
const ComponenteContenidoLista = require ('../../pages/pagesListas/componentesListas/contenidoLista');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//
class PaginaListadoListas extends React.Component {
    render() {
        const { currentUser } = this.props.initialState;
        return (            
            <React.Fragment>
                <Route
                    exact
                    path="/agregarLista"
                    render={(props) => <ComponenteAgregarLista {...props}/>}
                />
                <Route
                    exact
                    path="/paginaListadoListas"
                    render={(props) => <ComponenteListadoListas {...props} currentUser={currentUser}/>}
                />
                <Route
                    exact
                    path="/detalleLista/:id"
                    render={(props) => <ComponenteDetalleLista {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/editarLista/:id"
                    render={(props) => <ComponenteEditarLista {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/contenidoLista/:id"
                    render={(props) => <ComponenteContenidoLista {...props} id={props.match.params.id}/>}
                />              
            </React.Fragment>
        );
    }
};

module.exports = PaginaListadoListas;