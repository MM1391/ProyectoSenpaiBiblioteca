const React = require('react');
const { Redirect, NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Menu, Segment, Image, Container, Form } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteRegistro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreUsuario: '',
            contrasena: '',
            correo: '',
            fotoPerfil: '',
            redirect: null,
            error: false
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
            nombreUsuario: event.target.value
        });
    }

    procesarContrasena(event) {
        this.setState({
            contrasena: event.target.value
        });
    }

    correoChange(event) {
        this.setState({
            correo: event.target.value
        });
    }

    fotoPerfilChange(event) {
        this.setState({
            fotoPerfil: event.target.files[0]
        });
    }
//----------------------------------------------------------------------//

//--------------------------------SUBMIT--------------------------------//
    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/usuarios', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                nombreUsuario: this.state.nombreUsuario,
                contrasena: this.state.contrasena,
                correo: this.state.correo,
                fotoPerfil: this.state.fotoPerfil
            })
        })
        .then(res => res.json())
        .then((data) =>{
            window.location='/paginaListaUsuarios';
        })
        .catch((err) => {
            console.log(err);
            console.log("Error del Submit Registro: " + err.msg);
        });    
    }
//----------------------------------------------------------------------//

//--------------------------HANDLERS MENU NAV---------------------------//
    state = { 
        activeItem: '' 
    }

    linkACartas(){
        window.location='/paginaListadoCartasPub';
    } 

    linkAListas(){
        window.location='/paginaListadoListasPub';
    }
//----------------------------------------------------------------------//
    
//--------------------------------RENDER--------------------------------//
    render() {
        const { activeItem } = this.state
        
        if (this.state.redirect) {                        
            return <Redirect to="/home"/>
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
                            as={NavLink} to="/paginaListadoCartasPub"
                            name='cartas'
                            active={activeItem === 'cartas'}
                            onClick={this.linkACartas}
                        ><Icon name='modx'/>Cartas                            
                        </Menu.Item>
                        <Menu.Item
                            as={NavLink} to="/paginaListadoListasPub"
                            name='listas'
                            active={activeItem === 'listas'}
                            onClick={this.linkAListas}
                        ><Icon name='bars'/>Listas                            
                        </Menu.Item>
                    </Menu>
                </Segment>
{/* //--------------------------------------------------------------// */}

{/* //--------------------------CONTAINER---------------------------// */}
                <Container>
                    <Header as='h1'>
                        <Icon name='user plus'/>
                        <Header.Content>Registro</Header.Content>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field 
                            label='Nombre de Usuario:'
                            control='input'
                            placeholder='Nombre de Usuario'
                            value={this.state.nombreUsuario} 
                            required
                            onChange={this.nombreUsuarioChange}/>
                        <Form.Field 
                            label='Contraseña:'
                            control='input'
                            type='password'
                            placeholder='Contraseña'
                            value={this.state.contrasena}
                            required
                            onChange={this.procesarContrasena}/>
                        <Form.Field 
                            label='Correo electrónico:'
                            control='input'
                            placeholder='Correo'
                            value={this.state.correo} 
                            required
                            onChange={this.correoChange}/>
                        <Form.Field 
                            label='Foto de Perfil' 
                            name="img"
                            type='file'
                            control='input'
                            onChange={this.fotoPerfilChange}>
                        </Form.Field>
                        <Button type='submit' color='green'>Registrarse</Button>
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
module.exports = ComponenteRegistro;