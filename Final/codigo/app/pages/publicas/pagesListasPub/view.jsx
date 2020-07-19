const React = require('react');
const { Route } = require('react-router-dom');
//----------------------------------------------------------------------//

//-----------------------------COMPONENTES------------------------------//
const ComponenteListadoListasPub = require ('../pagesListasPub/componentesListasPub/listadoListasPub');
const ComponenteDetalleListaPub = require ('../pagesListasPub/componentesListasPub/detalleListaPub');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//
class PaginaListadoListas extends React.Component {
    render() {
        const { currentUser } = this.props.initialState;
        return (            
            <React.Fragment> 
                <Route
                    exact
                    path="/paginaListadoListasPub"
                    render={(props) => <ComponenteListadoListasPub {...props} currentUser={currentUser}/>}
                />
                <Route
                    exact
                    path="/detalleListaPub/:id"
                    render={(props) => <ComponenteDetalleListaPub {...props} id={props.match.params.id}/>}
                />            
            </React.Fragment>
        );
    }
};

module.exports = PaginaListadoListas;