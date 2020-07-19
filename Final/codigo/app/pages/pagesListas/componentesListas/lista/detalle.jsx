const React = require('react');
const { Link } = require ('react-router-dom');
const { Button, Table, Confirm } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ListaDetalle extends React.Component {

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
            {this.props.idLista} 
        </Table.Cell>
        <Table.Cell>
            {this.props.nombreLista} 
        </Table.Cell>
        <Table.Cell>
            <Button as={Link} to={`/editarLista/${this.props.idLista}`} color='purple'>Editar</Button>
            <Button onClick={this.open} color='red'>Borrar</Button>
              <Confirm content='¿Seguro que deseas borrar esta lista?'
                confirmButton='Si'
                cancelButton='No'
                open={this.state.open}
                onCancel={this.close}
                onConfirm={()=>this.props.onBorrarLista(this.props.idLista)}
              />
        </Table.Cell>
        <Table.Cell>
          <Button as={Link} to={`/contenidoLista/${this.props.idLista}`} color='teal'>Ver Cartas</Button> 
        </Table.Cell>
      </React.Fragment>
    );
  }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = ListaDetalle;