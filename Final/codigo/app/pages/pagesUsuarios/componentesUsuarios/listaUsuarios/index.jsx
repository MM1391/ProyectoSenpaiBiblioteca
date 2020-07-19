const React = require('react');
const Usuario = require('../usuario');
const { NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Table, Menu, Segment, Image, Container } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteListaUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: null,
            loading: true,
            error: false,
        };

        this.onDeleteUsuario = this.onDeleteUsuario.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

//--------------------------------DELETE--------------------------------//
    onDeleteUsuario(idUsuario){
        fetch(`/api/usuarios/${idUsuario}`, {
            method: 'DELETE', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
        })
        .then(response => response.json())
        .then(data => {
            this.onRefresh();
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onDeleteUsuario Lista Usuarios: " + err.msg);            
        });
    }
//----------------------------------------------------------------------//

//-------------------------------REFRESH--------------------------------//
    onRefresh() {
        fetch(`/api/usuarios/`)
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                usuarios: data.usuarios,
                loading: false,
                error: false,
            });         
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onRefresh Lista Usuarios: " + err.msg);             
        });
    }
//----------------------------------------------------------------------//

//-------------------------COMPONENT DID MOUNT--------------------------//
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
    render() {
        const { activeItem } = this.state
        const usuarios  = this.state.usuarios;
        
        if (this.state.loading) {
            return <div>Cargando usuarios ...</div>
        }
        
        return (
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
                        <Icon name='database' />
                        <Header.Content>
                            Panel de Admin
                            <Header.Subheader>{`${this.props.currentUser}`}</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Table striped celled selectable textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Usuario</Table.HeaderCell>
                                <Table.HeaderCell>Contraseña</Table.HeaderCell>
                                <Table.HeaderCell>Operaciones</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                usuarios.map(usuario => (
                                    <Table.Row>
                                        <Usuario
                                            key={usuario.idUsuario}
                                            idUsuario={usuario.idUsuario}
                                            nombreUsuario={usuario.nombreUsuario}
                                            contrasena={usuario.contrasena}
                                            onDeleteUsuario={this.onDeleteUsuario}
                                        />
                                    </Table.Row>
                                ))
                            }     
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
module.exports = ComponenteListaUsuarios;