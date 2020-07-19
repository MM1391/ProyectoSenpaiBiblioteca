const React = require('react');
const { NavLink, Redirect } = require ('react-router-dom');
const { Header, Icon, Button, Menu, Segment, Image, Container, Form } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteEditarLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: {
                idLista: null,
                nombreLista: '',
            },
            redirect : false,
            loading: true,
            error: false,
        };

        this.nombreListaChange = this.nombreListaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

//-----------------------HANDLERS CAMPOS DEL FORM-----------------------//    
    nombreListaChange(event) {
        this.setState({
            lista: {
                ...this.state.lista,
                nombreLista : event.target.value
            }
        });
    }
//----------------------------------------------------------------------//

//--------------------------------UPDATE--------------------------------//    
    handleSubmit(event) {
        event.preventDefault();

        fetch(`/api/listas/${this.state.lista.idLista}`, {
            method: 'PUT',
            headers : { "Content-Type" : "application/json; charset=utf-8" },
            body: JSON.stringify({              
                nombreLista: this.state.lista.nombreLista,
                idLista: this.state.lista.idLista
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
            console.log("Error Submit Editar Lista: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//------------------------------GET LISTA-------------------------------//
    componentDidMount() {
        fetch(`/api/listas/${this.props.id}`, {
            method: 'GET', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',             
        })
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                lista: {
                    ...data.lista
                },
                loading: false,
                error: false,
            });          
        })
        .catch((err) => {
            console.log(err);
            console.log("Error componentDidMount Editar Lista: " + err.msg);
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
        const { activeItem } = this.state;

        if (this.state.redirect) {
            return <Redirect to="/paginaListadoListas/"/>
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
                        <Icon name='edit' />
                        <Header.Content>Editar Lista</Header.Content>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input 
                            required 
                            label='Nombre de la Lista:'
                            placeholder='Nombre'
                            value={this.state.lista.nombreLista} 
                            onChange={this.nombreListaChange}>
                        </Form.Input>
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
module.exports = ComponenteEditarLista;