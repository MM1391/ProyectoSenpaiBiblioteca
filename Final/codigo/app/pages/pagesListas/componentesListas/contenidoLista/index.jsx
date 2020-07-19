const React = require('react');
const CartaDetalleEnLista = require('../lista/cartaDetalleEnLista');
const { NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Table, Menu, Segment, Image, Container } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteContenidoLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planillas: null,
            loading: true,
            error: false,
        };

        this.onBorrarCartaEnLista = this.onBorrarCartaEnLista.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

//--------------------------------DELETE--------------------------------//
onBorrarCartaEnLista(idCartaAsoc){
    fetch(`/api/cartas/${idCartaAsoc}`, {
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
        console.log("Error onBorrarCarta Contenido Lista: " + err.msg);
    });
}
//----------------------------------------------------------------------//

//-------------------------COMPONENT DID MOUNT--------------------------// 
    onRefresh() {
        fetch(`/api/planillas/${this.props.id}`)
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                planillas: data.planilla,
                loading: false,
                error: false,
            });         
        })
        .catch((err) => {
            console.log(err);
            console.log("Error onRefresh Contenido Lista: " + err.msg);
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
        const planillas  = this.state.planillas;

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
                        <Header.Content>Contenido Lista</Header.Content>
                    </Header>
                    <Table striped celled selectable textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID Carta</Table.HeaderCell>
                                <Table.HeaderCell>Detalle</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                planillas.map(planilla => (
                                    <Table.Row>
                                        <CartaDetalleEnLista
                                            key={planilla.idCartaAsoc}
                                            idCartaAsoc={planilla.idCartaAsoc}
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
module.exports = ComponenteContenidoLista;