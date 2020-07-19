const React = require('react');
const { Route } = require('react-router-dom');
//----------------------------------------------------------------------//

//-----------------------------COMPONENTES------------------------------//
const ComponenteListaUsuarios = require ('../../pages/pagesUsuarios/componentesUsuarios/listaUsuarios');
const ComponenteDetalleUsuario = require ('../../pages/pagesUsuarios/componentesUsuarios/detalleUsuario');
const ComponenteEditarUsuario = require ('../../pages/pagesUsuarios/componentesUsuarios/editarUsuario');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//
class PaginaListaUsuarios extends React.Component {
    render() {
        const { currentUser } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/paginaListaUsuarios"
                    render={(props) => <ComponenteListaUsuarios {...props} currentUser={currentUser}/>}
                />
                <Route
                    exact
                    path="/detalleUsuario/:id"
                    render={(props) => <ComponenteDetalleUsuario {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/editarUsuario/:id"
                    render={(props) => <ComponenteEditarUsuario {...props} id={props.match.params.id}/>}
                />
            </React.Fragment>
        );
    }
};

//----------------------------------------------------------------------//
module.exports = PaginaListaUsuarios;