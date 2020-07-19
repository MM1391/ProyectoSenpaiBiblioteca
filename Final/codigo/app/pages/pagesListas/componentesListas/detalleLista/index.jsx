const React = require('react');
const ListaDetalle = require('../lista/detalle');
const { NavLink, Redirect } = require ('react-router-dom');
const { Header, Icon, Table, Menu, Segment, Image, Container, Button } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteDetalleLista extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            lista: null, 
            loading: true,
            error: null,
        }

        this.onBorrarLista = this.onBorrarLista.bind(this);
    };
    
//--------------------------------DELETE--------------------------------//
    onBorrarLista(idLista){
        fetch(`/api/listas/${idLista}`, {
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
            this.setState({
                redirect: true
            });   
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onBorrarLista Detalle Lista: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//------------------------------GET LISTA-------------------------------//
    onRefresh() {
        fetch(`/api/listas/${this.props.id}`)
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                lista: data.lista,
                loading: false,
                error: false,
            });         
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onRefresh Detalle Carta: " + err.msg);
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
    render(){
        const { activeItem } = this.state;
        const lista  = this.state.lista;
        
        if (this.state.loading) {
            return <div>Cargando lista ...</div>
        }

        if (this.state.redirect) {
            return <Redirect to="/paginaListadoListas" />
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
                        <Icon name='file text'/>
                        <Header.Content>Detalle Lista</Header.Content>
                    </Header>
                    <Table celled textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Operaciones</Table.HeaderCell>
                                <Table.HeaderCell>Cartas</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <ListaDetalle
                                    key={lista.idLista}
                                    idLista={lista.idLista}
                                    nombreLista={lista.nombreLista}
                                    onBorrarLista={this.onBorrarLista}
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
module.exports = ComponenteDetalleLista;