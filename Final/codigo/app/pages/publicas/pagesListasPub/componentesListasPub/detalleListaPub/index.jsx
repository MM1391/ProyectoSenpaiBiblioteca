const React = require('react');
const ListaPub = require('../listaPub');
const { NavLink } = require ('react-router-dom');
const { Header, Icon, Table, Menu, Segment, Image, Container } = require ('semantic-ui-react');
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
    }
    
//-------------------------COMPONENT DID MOUNT--------------------------//  
    componentDidMount() {
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
            console.log("Error del onRefresh Detalle Carta: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//--------------------------HANDLERS MENU NAV---------------------------//
    state = { 
        activeItem: 'listas' 
    }

    handleItemClick = (e, { name }) => this.setState({ 
        activeItem: name 
    })
//----------------------------------------------------------------------//

//--------------------------------RENDER--------------------------------//
    render(){
        const { activeItem } = this.state;
        const lista  = this.state.lista;
        
        if (this.state.loading) {
            return <div>Cargando lista ...</div>
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
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <ListaPub
                                    key={lista.idLista}
                                    idLista={lista.idLista}
                                    nombreLista={lista.nombreLista}
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