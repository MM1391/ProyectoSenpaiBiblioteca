const React = require('react');
const CartaPub = require('../cartaPub');
const { Link, NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Table, Menu, Segment, Image, Container } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteListadoCartasPub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartas: null,
            loading: true,
            error: false,
        };

        this.onRefresh = this.onRefresh.bind(this);
    }

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

    linkACartas(){
        window.location='/paginaListadoCartasPub';
    } 

    linkAListas(){
        window.location='/paginaListadoListasPub';
    } 

    linkALogin(){
        window.location='/login';
    } 

    linkARegistro(){
        window.location='/registro';
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
                        <Menu.Menu position='right' size='small'>
                            <Menu.Item>
                                <Button onClick={this.linkALogin} color='blue'>Login</Button>
                                <Button onClick={this.linkARegistro} color='green'>Registrarse</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>
{/* //--------------------------------------------------------------// */}

{/* //--------------------------CONTAINER---------------------------// */}
                <Container>
                    <Header as='h1'>
                        <Icon name='folder open' />
                        <Header.Content>Listado de Cartas</Header.Content>
                        <Header.Subheader>{`${this.props.currentUser}`}</Header.Subheader>
                    </Header>
                    <Table striped celled selectable textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                <Table.HeaderCell>First Edition</Table.HeaderCell>
                                <Table.HeaderCell>Región</Table.HeaderCell>
                                <Table.HeaderCell>Detalle</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                            cartas.map(carta => (
                                <Table.Row>
                                    <CartaPub
                                        key={carta.idCarta}
                                        idCarta={carta.idCarta}
                                        nombreCarta={carta.nombreCarta}
                                        tipo={carta.tipo}
                                        firstEd={carta.firstEd}
                                        region={carta.region}
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
module.exports = ComponenteListadoCartasPub;