const React = require('react');
const Carta = require('../carta');
const { Link, NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Table, Menu, Segment, Image, Container } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteListadoCartas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartas: null,
            loading: true,
            error: false,
        };

        this.onBorrarCarta = this.onBorrarCarta.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

//--------------------------------DELETE--------------------------------//
    onBorrarCarta(idCarta){
        fetch(`/api/cartas/${idCarta}`, {
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
            console.log("Error onBorrarCarta Listado Cartas: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//-------------------------------REFRESH--------------------------------//
    onRefresh() {
        fetch(`/api/cartas/`)
        .then(res => res.json())
        .then((data) =>{      
            this.setState({
                cartas: data.cartas,
                loading: false,
                error: false,
            });         
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onRefresh Listado Cartas: " + err.msg);
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
        activeItem: 'cartas' 
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
        const cartas  = this.state.cartas;

        if (this.state.loading) {
            return <div>Cargando cartas ...</div>
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
                        <Icon name='folder open' />
                        <Header.Content>
                            Panel de Control
                        <Header.Subheader>{`${this.props.currentUser}`}</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Button as={Link} to={`/agregarCarta`} color='green'>Agregar Carta</Button>
                    <Table striped celled selectable textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                <Table.HeaderCell>En Colección</Table.HeaderCell>
                                <Table.HeaderCell>Operaciones</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                            cartas.map(carta => (
                                <Table.Row>
                                    <Carta
                                        key={carta.idCarta}
                                        idCarta={carta.idCarta}
                                        nombreCarta={carta.nombreCarta}
                                        tipo={carta.tipo}
                                        enColeccion={carta.enColeccion} 
                                        onBorrarCarta={this.onBorrarCarta}
                                    />
                                </Table.Row>))
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
module.exports = ComponenteListadoCartas;