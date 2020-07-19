const React = require('react');
const { NavLink, Redirect } = require ('react-router-dom');
const { Header, Icon, Button, Menu, Segment, Image, Container, Form } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteEditarCarta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carta: {
                idCarta: null,
                nombreCarta: '',
                tipo: '',
                enColeccion: '',
                img: '',
                firstEd: '',
                firstEdStatus: '',
                region: '',
            },
            redirect : false,
            loading: true,
            error: false,
        };

        this.nombreCartaChange = this.nombreCartaChange.bind(this);
        this.tipoChange = this.tipoChange.bind(this);
        this.enColeccionChange = this.enColeccionChange.bind(this);
        this.imgChange = this.imgChange.bind(this);
        this.firstEdChange = this.firstEdChange.bind(this);
        this.firstEdStatusChange = this.firstEdStatusChange.bind(this);
        this.regionChange = this.regionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

//-----------------------HANDLERS CAMPOS DEL FORM-----------------------//    
    nombreCartaChange(event) {
        this.setState({
            carta: {
                ...this.state.carta,
                nombreCarta : event.target.value
            }
        });
    }

    tipoChange(event) {
        this.setState({
            carta: {
                ...this.state.carta,
                tipo : event.target.value
            }
        });
    }

    enColeccionChange(event) {
        this.setState({
            carta: {
                ...this.state.carta,
                enColeccion : event.target.value
            }
        });
    }

    imgChange(event) {
        this.setState({
            carta: {
                ...this.state.carta,
                img : event.target.value
            }
        });
    }

    firstEdChange(event) {
        this.setState({
            carta: {
                ...this.state.carta,
                firstEd : event.target.value
            }
        });
    }

    firstEdStatusChange(event) {
        this.setState({
            carta: {
                ...this.state.carta,
                firstEdStatus : event.target.value
            }
        });
    }

    regionChange(event) {
        this.setState({
            carta: {
                ...this.state.carta,
                region : event.target.value
            }
        });
    }
//----------------------------------------------------------------------//

//--------------------------------UPDATE--------------------------------//    
    handleSubmit(event) {
        event.preventDefault();

        fetch(`/api/cartas/${this.state.carta.idCarta}`, {
            method: 'PUT',
            headers : { "Content-Type" : "application/json; charset=utf-8" },
            body: JSON.stringify({              
                nombreCarta: this.state.carta.nombreCarta,
                tipo: this.state.carta.tipo,
                enColeccion: this.state.carta.enColeccion,
                img: this.state.carta.img,
                firstEd: this.state.carta.firstEd,
                firstEdStatus: this.state.carta.firstEdStatus,
                region: this.state.carta.region,
                idCarta: this.state.carta.idCarta
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
            console.log("Error Submit Editar Carta: " + err.msg);
        });
    }
//----------------------------------------------------------------------//

//------------------------------GET CARTA-------------------------------//
    componentDidMount() {
        fetch(`/api/cartas/${this.props.id}`, {
            method: 'GET', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',           
        })
        .then(res => res.json())
        .then((data) =>{
            this.setState({
                carta: {
                    ...data.carta
                },
                loading: false,
                error: false,
            });           
        })
        .catch((err) => {
            console.log(err);
            console.log("Error componentDidMount Editar Carta: " + err.msg);
        });
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

        if (this.state.redirect) {
            return <Redirect to="/paginaListadoCartas/"/>
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
                        <Header.Content>Editar Carta</Header.Content>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field 
                            label='Nombre de la Carta:'
                            control='input'
                            placeholder='Nombre de la Carta'
                            value={this.state.carta.nombreCarta} 
                            required
                            onChange={this.nombreCartaChange}/>
                        <Form.Field 
                            label='Tipo:' 
                            name="tipo"
                            control='select'
                            onChange={this.tipoChange} 
                            required>
                                <option value={this.state.carta.tipo}>Monstruo</option>
                                <option value={this.state.carta.tipo}>Magia</option>
                                <option value={this.state.carta.tipo}>Trampa</option>
                                <option value={this.state.carta.tipo}>Other</option>
                        </Form.Field>
                        <Form.Field 
                            label='En Colección:' 
                            name="enColeccion"
                            control='select'
                            onChange={this.enColeccionChange} 
                            required>
                                <option value={this.state.carta.enColeccion}>Si</option>
                                <option value={this.state.carta.enColeccion}>No</option>
                                <option value={this.state.carta.enColeccion}>Proxy</option>
                        </Form.Field>
                        <Form.Field 
                            label='First Edition:' 
                            name="firstEd"
                            control='select'
                            onChange={this.firstEdChange} 
                            required>
                                <option value={this.state.carta.firstEd}>AST</option>
                                <option value={this.state.carta.firstEd}>DCR</option>
                                <option value={this.state.carta.firstEd}>IOC</option>
                                <option value={this.state.carta.firstEd}>LOB</option>
                                <option value={this.state.carta.firstEd}>LOD</option>
                                <option value={this.state.carta.firstEd}>LON</option>
                                <option value={this.state.carta.firstEd}>MFC</option>
                                <option value={this.state.carta.firstEd}>MRD</option>
                                <option value={this.state.carta.firstEd}>PGD</option>
                                <option value={this.state.carta.firstEd}>PSV</option>
                                <option value={this.state.carta.firstEd}>SDJ</option>
                                <option value={this.state.carta.firstEd}>SDY</option>
                                <option value={this.state.carta.firstEd}>SDP</option>
                                <option value={this.state.carta.firstEd}>SKE</option>
                                <option value={this.state.carta.firstEd}>SYE</option>
                                <option value={this.state.carta.firstEd}>SRL</option>
                                <option value={this.state.carta.firstEd}>Promo</option>
                                <option value={this.state.carta.firstEd}>Other</option>
                        </Form.Field>
                        <Form.Field 
                            label='First Ed. Status:' 
                            name="firsEdStatus"
                            control='select'
                            onChange={this.firstEdStatusChange} 
                            required>
                                <option value={this.state.carta.firstEdStatus}>Si</option>
                                <option value={this.state.carta.firstEdStatus}>No</option>
                        </Form.Field>
                        <Form.Field 
                            label='Region:' 
                            name="region"
                            control='select'
                            onChange={this.regionChange} 
                            required>
                                <option value={this.state.carta.region}>TCG</option>
                                <option value={this.state.carta.region}>OCG</option>
                        </Form.Field>
                        <Form.Field 
                            label='Imagen:' 
                            name="img"
                            type='file'
                            control='input'
                            onChange={this.imgChange} 
                            >
                        </Form.Field>
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
module.exports = ComponenteEditarCarta;