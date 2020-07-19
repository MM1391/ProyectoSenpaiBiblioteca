const React = require('react');
const { Link } = require ('react-router-dom');
const { Button, Table, Confirm } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class CartaDetalleEnLista extends React.Component {

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
            {this.props.idCartaAsoc} 
        </Table.Cell>  
        <Table.Cell>
          <Button as={Link} to={`/detalleCarta/${this.props.idCartaAsoc}`} color='teal'>Ver Carta</Button>
          <Button onClick={this.open} color='red'>Quitar</Button>
              <Confirm content='¿Seguro que deseas borrar esta carta?'
                confirmButton='Si'
                cancelButton='No'
                open={this.state.open}
                onCancel={this.close}
                onConfirm={()=>this.props.onBorrarCarta(this.props.idCartaAsoc)}
          />
        </Table.Cell>
      </React.Fragment>
    );
  }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = CartaDetalleEnLista;