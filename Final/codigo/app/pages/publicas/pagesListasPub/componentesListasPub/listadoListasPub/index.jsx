const React = require('react');
const ListaPub = require('../listaPub');
const { Link, NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Table, Menu, Segment, Image, Container } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteListadoListasPub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreLista: null,
            loading: true,
            error: false,
        };

        this.onBorrarLista = this.onBorrarLista.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

//-------------------------COMPONENT DID MOUNT--------------------------//    
    componentDidMount() {
        fetch(`/api/listas`)
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                listas: data.listas,
                loading: false,
                error: false,
            });         
        })
        .catch((err) => {
            console.log(err);
            console.log("Error del onRefresh Listado Listas: " + err.msg);
            res.status(401).json({
                success: false,
                msg: err.msg
            })
        });
    }
//----------------------------------------------------------------------//

//--------------------------HANDLERS MENU NAV---------------------------//
    state = { 
        activeItem: 'listas' 
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
        const { activeItem } = this.state;
        const listas  = this.state.listas;

        if (this.state.loading) {
            return <div>Cargando listas ...</div>
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
                                <Button as={Link} to={`/login`} color='grey'>Login</Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Button as={Link} to={`/registro`} color='blue'>Registrarse</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>
{/* //--------------------------------------------------------------// */}

{/* //--------------------------CONTAINER---------------------------// */}
                <Container>
                    <Header as='h1'>
                        <Icon name='clipboard'/>
                        <Header.Content>Listado de Listas</Header.Content>
                        <Header.Subheader>{`${this.props.currentUser}`}</Header.Subheader>
                    </Header>
                    <Table striped celled selectable textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                            listas.map(lista => (
                                <Table.Row>
                                    <ListaPub
                                        key={lista.idLista}
                                        idLista={lista.idLista}
                                        nombreLista={lista.nombreLista}
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
module.exports = ComponenteListadoListasPub;