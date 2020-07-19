const React = require('react');
const CartaPubDetalle = require('../cartaPub/detalle');
const { NavLink, Link } = require ('react-router-dom');
const { Header, Icon, Table, Menu, Segment, Image, Container, Button } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteDetalleCartaPub extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            carta: null, 
            loading: true,
            error: null,
        }
    }

//----------------------------GET ALL CARTAS----------------------------//
    onRefresh() {
        fetch(`/api/cartas/${this.props.id}`)
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                carta: data.carta,
                loading: false,
                error: false,
            });           
        })
    }
//----------------------------------------------------------------------//

//-------------------------------REFRESH--------------------------------//
    componentDidMount() {
        this.onRefresh();
    }
//----------------------------------------------------------------------//

//--------------------------HANDLERS MENU NAV---------------------------//
    state = { 
        activeItem: 'cartas' 
    }

    handleItemClick = (e, { name }) => this.setState({ 
        activeItem: name 
    })
//----------------------------------------------------------------------//

//--------------------------------RENDER--------------------------------//
    render(){
        const { activeItem } = this.state;
        const carta  = this.state.carta;
        
        if (this.state.loading) {
            return <div>Cargando carta ...</div>
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
                            as={NavLink} to="/paginaListadoCartasPub"
                            name='cartas'
                            active={activeItem === 'cartas'}
                            onClick={this.handleItemClick}
                        ><Icon name='modx'/>Cartas                            
                        </Menu.Item>
                        <Menu.Item
                            as={NavLink} to="/paginaListadoListasPub"
                            name='listas'
                            active={activeItem === 'listas'}
                            onClick={this.handleItemClick}
                        ><Icon name='bars'/>Listas                            
                        </Menu.Item>
                        <Menu.Menu position='right' size='small'>
                            <Menu.Item>
                                <Button as={Link} to={`/login`} color='blue'>Login</Button>
                                <Button as={Link} to={`/registro`} color='green'>Registrarse</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>
{/* //--------------------------------------------------------------// */}

{/* //--------------------------CONTAINER---------------------------// */}
                <Container>
                    <Header as='h1'>
                        <Icon name='file text'/>
                        <Header.Content>Detalle Carta</Header.Content>
                    </Header>
                    <Table celled textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                <Table.HeaderCell>Imagen</Table.HeaderCell>
                                <Table.HeaderCell>First Edition</Table.HeaderCell>
                                <Table.HeaderCell>Región</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <CartaPubDetalle
                                    key={carta.idCarta}
                                    idCarta={carta.idCarta}
                                    nombreCarta={carta.nombreCarta}
                                    tipo={carta.tipo}
                                    img={carta.img}
                                    firstEd={carta.firstEd}
                                    region={carta.region}  
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
module.exports = ComponenteDetalleCartaPub;