const React = require('react');
const UsuarioDetalle = require('../usuario/detalle');
const { NavLink, Redirect } = require ('react-router-dom');
const { Header, Icon, Table, Menu, Segment, Image, Container, Button, Card, Grid } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteDetalleUsuario extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            usuario: null, 
            loading: true,
            redirect: false,
            error: null,
        }

        this.onDeleteUsuario = this.onDeleteUsuario.bind(this);
    };

//--------------------------------DELETE--------------------------------//
    onDeleteUsuario(idUsuario){
        fetch(`/api/usuarios/${idUsuario}`, {
            method: 'DELETE', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                redirect: true
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onDeleteUsuario Detalle Usuario: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//------------------------------GET USUARIO-----------------------------//    
    onRefresh() {
        fetch(`/api/usuarios/${this.props.id}`)
        .then(res => res.json())
        .then((data) =>{            
            this.setState({
                usuario: data.usuario,
                loading: false,
                error: false,
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onRefresh Detalle Usuario: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//-------------------------------REFRESH--------------------------------//
componentDidMount() {
    this.onRefresh();
}
//----------------------------------------------------------------------//

//--------------------------HANDLERS MENU NAV---------------------------//
    state = { 
        activeItem: 'usuarios' 
    }

    linkAUsuarios(){
        window.location='/paginaListaUsuarios';
    } 

    linkACartas(){
        window.location='/paginaListadoCartas';
    } 

    linkAListas(){
        window.location='/paginaListadoListas';
    } 

    logout(){
        window.location='/logout';
    }
//----------------------------------------------------------------------//

//--------------------------------RENDER--------------------------------//
    render(){
        const { activeItem } = this.state
        const usuario  = this.state.usuario;

        if (this.state.loading) {
            return <div>Cargando usuario ...</div>
        }

        if (this.state.redirect) {
            return <Redirect to="/paginaListaUsuarios" />
        }

        return(
            <div>
{/* //---------------------------MENU NAV---------------------------// */}
                <Segment inverted>
                    <Menu inverted secondary icon='labeled' size='small'>
                        <Menu.Item>
                            <Image size="mini" href='/home'
                            src="http://vignette4.wikia.nocookie.net/yugioh/images/d/d7/Back-Anime-DM.png/revision/latest?cb=20071029201207" />
                        </Menu.Item>
                        <Menu.Item
                            as={NavLink} to="/paginaListaUsuarios"
                            name='usuarios'
                            active={activeItem === 'usuarios'}
                            onClick={this.linkAUsuarios}
                        ><Icon name='users'/>Usuarios                            
                        </Menu.Item>
                        <Menu.Item
                            as={NavLink} to="/paginaListadoCartas"
                            name='cartas'
                            active={activeItem === 'cartas'}
                            onClick={this.linkACartas}
                        ><Icon name='modx'/>Cartas                            
                        </Menu.Item>
                        <Menu.Item
                            as={NavLink} to="/paginaListadoListas"
                            name='listas'
                            active={activeItem === 'listas'}
                            onClick={this.linkAListas}
                        ><Icon name='bars'/>Listas                            
                        </Menu.Item>
                        <Menu.Menu position='right' size='small'>
                            <Menu.Item>
                                <Button onClick={this.logout} color='grey'>Cerrar Sesión</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>
{/* //--------------------------------------------------------------// */}

{/* //--------------------------CONTAINER---------------------------// */}
                <Container>
                    <Header as='h1'>
                        <Icon name='user' />
                        <Header.Content>Detalle Usuario</Header.Content>
                    </Header>
                    <Table celled textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Usuario</Table.HeaderCell>
                                <Table.HeaderCell>Contraseña</Table.HeaderCell>
                                <Table.HeaderCell>Correo</Table.HeaderCell>
                                <Table.HeaderCell>Foto de Perfil</Table.HeaderCell>
                                <Table.HeaderCell>Operaciones</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <UsuarioDetalle
                                    key={usuario.idUsuario}
                                    idUsuario={usuario.idUsuario}
                                    nombreUsuario={usuario.nombreUsuario}
                                    contrasena={usuario.contrasena}
                                    correo={usuario.correo}
                                    fotoPerfil={usuario.fotoPerfil}
                                    onDeleteUsuario={this.onDeleteUsuario}  
                                />                                
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Container>
{/* //--------------------------------------------------------------// */}
            </div>
        );
    }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = ComponenteDetalleUsuario;