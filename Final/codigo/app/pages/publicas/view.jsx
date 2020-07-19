const React = require('react');
const { Route } = require('react-router-dom');
//----------------------------------------------------------------------//

//-----------------------------COMPONENTES------------------------------//
//*Home*//
const ComponenteHome = require ('../publicas/componentes/home');

//*Login*//
const ComponenteLogin = require ('../publicas/componentes/login');

//*Usuarios*//
const ComponenteRegistro = require ('../publicas/componentes/registro');
//----------------------------------------------------------------------//

//--------------------------------RUTAS---------------------------------//
class PaginaListadoCartas extends React.Component {
    render() {
        return (            
            <React.Fragment>
{/* //-----------------------------HOME-----------------------------// */}
                <Route
                    exact
                    path="/home"
                    render={(props) => <ComponenteHome {...props}/>}
                />
{/* //--------------------------------------------------------------// */}

{/* //----------------------------LOGIN-----------------------------// */}
                <Route
                    exact
                    path="/login"
                    render={(props) => <ComponenteLogin {...props}/>}
                />
{/* //--------------------------------------------------------------// */}

{/* //---------------------------REGISTRO---------------------------// */}
                <Route
                    exact
                    path="/registro"
                    render={(props) => <ComponenteRegistro {...props}/>}
                />
{/* //--------------------------------------------------------------// */}
            </React.Fragment>
        );
    }
};

module.exports = PaginaListadoCartas;