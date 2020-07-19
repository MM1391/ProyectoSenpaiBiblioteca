const React = require('react');
const CartaDetalle = require('../carta/detalle');
const { NavLink, Redirect } = require ('react-router-dom');
const { Header, Icon, Table, Menu, Segment, Image, Container, Button } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteDetalleCarta extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            carta: null, 
            loading: true,
            redirect: false,
            error: null,
        }

        this.onBorrarCarta = this.onBorrarCarta.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    };
    
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
            this.setState({
                redirect: true
            });        
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onBorrarCarta Detalle Carta: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//------------------------------GET CARTA-------------------------------//
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
    render(){
        const { activeItem } = this.state;
        const carta  = this.state.carta;
        
        if (this.state.loading) {
            return <div>Cargando carta ...</div>
        }

        if (this.state.redirect) {
            return <Redirect to="/paginaListadoCartas" />
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
                        <Header.Content>Detalle Carta</Header.Content>
                    </Header>
                    <Table celled textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                <Table.HeaderCell>En Colección</Table.HeaderCell>
                                <Table.HeaderCell>Imagen</Table.HeaderCell>
                                <Table.HeaderCell>First Edition</Table.HeaderCell>
                                <Table.HeaderCell>First Ed. Status</Table.HeaderCell>
                                <Table.HeaderCell>Región</Table.HeaderCell>
                                <Table.HeaderCell>Operaciones</Table.HeaderCell>
                                <Table.HeaderCell>Op. Lista</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <CartaDetalle
                                    key={carta.idCarta}
                                    idCarta={carta.idCarta}
                                    nombreCarta={carta.nombreCarta}
                                    tipo={carta.tipo}
                                    enColeccion={carta.enColeccion}
                                    img={carta.img}
                                    firstEd={carta.firstEd}
                                    firstEdStatus={carta.firstEdStatus}
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
module.exports = ComponenteDetalleCarta;