const React = require('react');
const { Link } = require ('react-router-dom');
const { Button, Table, Confirm } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class Carta extends React.Component {

//-------------------------------CONFIRM--------------------------------//
  state = { 
    open: false 
  }

  open = () => this.setState({ 
    open: true 
  })

  close = () => this.setState({ 
    open: false 
  })
//----------------------------------------------------------------------//

//--------------------------------RENDER--------------------------------//
  render() {
    return (
      <React.Fragment>
        <Table.Cell>
            {this.props.idCarta} 
        </Table.Cell>    
        <Table.Cell>
            {this.props.nombreCarta} 
        </Table.Cell> 
        <Table.Cell>
            {this.props.tipo} 
        </Table.Cell> 
        <Table.Cell>
            {this.props.enColeccion}          
        </Table.Cell>
        <Table.Cell>
            <Button as={Link} to={`/detalleCarta/${this.props.idCarta}`} color='yellow'>Detalle</Button>
            <Button as={Link} to={`/editarCarta/${this.props.idCarta}`} color='purple'>Editar</Button>
            <Button onClick={this.open} color='red'>Borrar</Button>
              <Confirm content='¿Seguro que deseas borrar esta carta?'
                confirmButton='Si'
                cancelButton='No'
                open={this.state.open}
                onCancel={this.close}
                onConfirm={()=>this.props.onBorrarCarta(this.props.idCarta)}
              />
        </Table.Cell>
      </React.Fragment>
    );
  }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = Carta;