const React = require('react');
const { Redirect, NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Menu, Segment, Image, Container, Form } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteEditarUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {     
                idUsuario: null,           
                nombreUsuario: '',
                contrasena: '',
                correo: '',
                fotoPerfil: '',                
            },
            redirect : false,
            loading: true,
            error: false,
        };

        this.nombreUsuarioChange = this.nombreUsuarioChange.bind(this);
        this.procesarContrasena = this.procesarContrasena.bind(this);
        this.correoChange = this.correoChange.bind(this);
        this.fotoPerfilChange = this.fotoPerfilChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

//-----------------------HANDLERS CAMPOS DEL FORM-----------------------//
    nombreUsuarioChange(event) {
        this.setState({  
            usuario: {
                ...this.state.usuario,
                nombreUsuario: event.target.value 
            }                    
        });
    }

    procesarContrasena(event) {
        this.setState({  
            usuario: {
                ...this.state.usuario,
                contrasena: event.target.value 
            }                    
        });
    }

    correoChange(event) {
        this.setState({  
            usuario: {
                ...this.state.usuario,
                correo: event.target.value 
            }                    
        });
    }

    fotoPerfilChange(event) {
        this.setState({  
            usuario: {
                ...this.state.usuario,
                fotoPerfil: event.target.value 
            }                    
        });
    }
//----------------------------------------------------------------------//

//--------------------------------UPDATE--------------------------------//
    handleSubmit(event) {
        event.preventDefault();

        fetch(`/api/usuarios/${this.state.usuario.idUsuario}`, {
            method: 'PUT',
            headers : { "Content-Type" : "application/json; charset=utf-8" },
            body: JSON.stringify({
                nombreUsuario: this.state.usuario.nombreUsuario,
                contrasena: this.state.usuario.contrasena,
                correo: this.state.usuario.correo,
                fotoPerfil: this.state.usuario.fotoPerfil,
                idUsuario: this.state.usuario.idUsuario
            })
        })
        .then(res => res.json())        
        .then((data) =>{
            this.setState({
                redirect: true
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Submit Editar Usuario: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//-----------------------------GET USUARIO------------------------------//
    componentDidMount() {
        fetch(`/api/usuarios/${this.props.id}`, {
            method: 'GET', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',             
        })
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                usuario: {
                    ...data.usuario
                },
                loading: false,
                error: false,
            });         
        })
        .catch((err) => {
            console.log(err);
            console.log("Error componentDidMount Editar Usuario: " + err.msg);
        });
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

        if (this.state.redirect) {
            return <Redirect to="/paginaListaUsuarios" />
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
                        <Icon name='user doctor'/>
                        <Header.Content>Editar Usuario</Header.Content>
                    </Header>                
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field 
                            label='Nombre de Usuario:'
                            control='input'
                            placeholder='Nombre de Usuario'
                            value={this.state.usuario.nombreUsuario} 
                            required
                            onChange={this.nombreUsuarioChange}/>
                        <Form.Field 
                            label='Contraseña:'
                            control='input'
                            type='password'
                            placeholder='Contraseña'
                            value={this.state.usuario.contrasena} 
                            required
                            onChange={this.procesarContrasena}/>
                        <Form.Field 
                            label='Correo electrónico:'
                            control='input'
                            placeholder='Correo'
                            value={this.state.usuario.correo} 
                            required
                            onChange={this.correoChange}/>
                        <Form.Field 
                            label='Foto de Perfil' 
                            name="img"
                            type='file'
                            control='input'
                            onChange={this.fotoPerfilChange}>
                        </Form.Field>
                        <Button type='submit' color='green'>Guardar</Button>
                    </Form>
                </Container>
{/* //--------------------------------------------------------------// */}
            </div>
        );
    }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = ComponenteEditarUsuario;