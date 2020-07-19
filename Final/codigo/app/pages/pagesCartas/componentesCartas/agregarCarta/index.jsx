const React = require('react');
const { Redirect, NavLink } = require ('react-router-dom');
const { Header, Icon, Button, Menu, Segment, Image, Container, Form } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ComponenteNuevaCarta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreCarta: '',
            tipo: '',
            enColeccion: '',
            img: null,
            firstEd: '',
            firstEdStatus: '',
            region: '',
            redirect: null
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
            nombreCarta: event.target.value
        });
    }

    tipoChange(event) {
        this.setState({
            tipo: event.target.value
        });
    }

    enColeccionChange(event) {
        this.setState({
            enColeccion: event.target.value
        });
    }    

    imgChange = e => {
        let file = e.target.files[0];
        this.setState(() => ({ img: file.name }), () => {
            console.log('state ', this.state.img);
        });
    }

    firstEdChange(event) {
        this.setState({
            firstEd: event.target.value
        });
    }

    firstEdStatusChange(event) {
        this.setState({
            firstEdStatus: event.target.value
        });
    }

    regionChange(event) {
        this.setState({
            region: event.target.value
        });
    }
//----------------------------------------------------------------------//

//--------------------------------SUBMIT--------------------------------//
    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/cartas', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8" },
            body: JSON.stringify({
                nombreCarta: this.state.nombreCarta,
                tipo: this.state.tipo,
                enColeccion: this.state.enColeccion,
                img: this.state.img,
                firstEd: this.state.firstEd,
                firstEdStatus: this.state.firstEdStatus,
                region: this.state.region
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
            console.log("Error Submit Agregar Carta: " + err.msg);
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
        const { activeItem } = this.state

        if (this.state.redirect) {                        
            return <Redirect to="/paginaListadoCartas"/>
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
                        <Icon name='file'/>
                        <Header.Content>Agregar Carta</Header.Content>
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field 
                            label='Nombre de la Carta:'
                            control='input'
                            placeholder='Nombre de la Carta'
                            value={this.state.nombreCarta} 
                            required
                            onChange={this.nombreCartaChange}/>
                        <Form.Field 
                            label='Tipo:' 
                            name="tipo"
                            control='select'
                            onChange={this.tipoChange} 
                            required>
                                <option selected disabled>Tipo de Carta</option>
                                <option value='monstruo'>Monstruo</option>
                                <option value='magia'>Magia</option>
                                <option value='trampa'>Trampa</option>
                                <option value='other'>Other</option>
                        </Form.Field>
                        <Form.Field 
                            label='En Colección:' 
                            name="enColeccion"
                            control='select'
                            onChange={this.enColeccionChange} 
                            required>
                                <option selected disabled>En Colección</option>
                                <option value='si'>Si</option>
                                <option value='no'>No</option>
                                <option value='proxy'>Proxy</option>
                        </Form.Field>
                        <Form.Field 
                            label='First Edition:' 
                            name="firstEd"
                            control='select'
                            onChange={this.firstEdChange} 
                            required>
                                <option selected disabled>First Edition</option>
                                <option value='ast'>AST</option>
                                <option value='dcr'>DCR</option>
                                <option value='ioc'>IOC</option>
                                <option value='lob'>LOB</option>
                                <option value='lod'>LOD</option>
                                <option value='lon'>LON</option>
                                <option value='mfc'>MFC</option>
                                <option value='mrd'>MRD</option>
                                <option value='pgd'>PGD</option>
                                <option value='psv'>PSV</option>
                                <option value='sdj'>SDJ</option>
                                <option value='sdy'>SDY</option>
                                <option value='sdp'>SDP</option>
                                <option value='ske'>SKE</option>
                                <option value='sye'>SYE</option>
                                <option value='srl'>SRL</option>
                                <option value='promo'>Promo</option>
                                <option value='other'>Other</option>
                        </Form.Field>
                        <Form.Field 
                            label='First Ed. Status:' 
                            name="firsEdStatus"
                            control='select'
                            onChange={this.firstEdStatusChange} 
                            required>
                                <option selected disabled>First Ed. Status</option>
                                <option value='si'>Si</option>
                                <option value='no'>No</option>
                        </Form.Field>                        
                        <Form.Field 
                            label='Region:' 
                            name="region"
                            control='select'
                            onChange={this.regionChange} 
                            required>
                                <option selected disabled>Región</option>
                                <option value='tcg'>TCG</option>
                                <option value='ocg'>OCG</option>
                        </Form.Field>
                        <Form.Field 
                            label='Imagen:' 
                            name="img"
                            type='file'
                            control='input'
                            onChange={this.imgChange}>
                        </Form.Field>
                        <Button type='submit' color='green'>Agregar</Button>
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
module.exports = ComponenteNuevaCarta;