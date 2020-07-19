const React = require('react');
const { Route } = require('react-router-dom');
//----------------------------------------------------------------------//

//-----------------------------COMPONENTES------------------------------//
//*Cartas*//
const ComponenteListadoCartasPub = require ('../pagesCartasPub/componentesCartasPub/listadoCartasPub');
const ComponenteDetalleCartaPub = require ('../pagesCartasPub/componentesCartasPub/detalleCartaPub');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//
class PaginaListadoCartasPub extends React.Component {
    render() {
        const { currentUser } = this.props.initialState;
        return (            
            <React.Fragment>
                <Route
                    exact
                    path="/paginaListadoCartasPub"
                    render={(props) => <ComponenteListadoCartasPub {...props} currentUser={currentUser}/>}
                />
                <Route
                    exact
                    path="/detalleCartaPub/:id"
                    render={(props) => <ComponenteDetalleCartaPub {...props} id={props.match.params.id}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = PaginaListadoCartasPub;