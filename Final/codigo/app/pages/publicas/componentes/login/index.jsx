const React = require('react');
const { NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Menu, Segment, Image, Container, Form } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombreUsuario: '',
            contrasena: '',
        };

        this.nombreUsuarioChange = this.nombreUsuarioChange.bind(this);
        this.procesarContrasena = this.procesarContrasena.bind(this);
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
//----------------------------------------------------------------------//

//--------------------------------SUBMIT--------------------------------//
    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                nombreUsuario: this.state.nombreUsuario,
                contrasena: this.state.contrasena
            })
        })
        .then(res => res.json())
        .then((data) =>{
            if (data.result.success == 'true') {
                window.location='/paginaListaUsuarios';
            } else {
                console.log("error");
            }   
        })
        .catch((err) => {
            console.log(err);
            console.log("Error del Submit Login: " + err.msg);
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
                        <Icon name='lock' />
                        <Header.Content>Login</Header.Content>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Nombre de Usuario:</label>
                            <input type="text" name="nombreUsuario" value={this.state.nombreUsuario} 
                                onChange={this.nombreUsuarioChange} required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Contraseña:</label>
                            <input type="password" name="contrasena" value={this.state.contrasena} 
                                onChange={this.procesarContrasena} required/>
                        </Form.Field>
                        <Button type='submit' color='green'>Entrar</Button>
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
module.exports = ComponenteLogin;