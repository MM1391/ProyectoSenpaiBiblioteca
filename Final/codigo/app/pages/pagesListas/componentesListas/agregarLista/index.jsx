const React = require('react');
const { Redirect, NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Menu, Segment, Image, Container, Form } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteNuevaLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreLista: '',
            redirect: null
        };

        this.nombreListaChange = this.nombreListaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

//-----------------------HANDLERS CAMPOS DEL FORM-----------------------//
    nombreListaChange(event) {
        this.setState({
            nombreLista: event.target.value
        });
    }
//----------------------------------------------------------------------//

//--------------------------------SUBMIT--------------------------------//
    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/listas', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8" },
            body: JSON.stringify({
                nombreLista: this.state.nombreLista,
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
            console.log("Error Submit Agregar Lista: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//--------------------------HANDLERS MENU NAV---------------------------//
    state = { 
        activeItem: 'listas' 
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
            return <Redirect to="/paginaListadoListas"/>
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
                        <Icon name='file'/>
                        <Header.Content>Agregar Lista</Header.Content>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field 
                            label='Nombre de la Lista:'
                            control='input'
                            placeholder='Nombre de la Lista'
                            value={this.state.nombreLista} 
                            required
                            onChange={this.nombreListaChange}/>                        
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
module.exports = ComponenteNuevaLista;