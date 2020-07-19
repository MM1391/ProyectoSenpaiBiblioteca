const React = require('react');
const { Link } = require ('react-router-dom');
const { Button, Table, Confirm } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class UsuarioDetalle extends React.Component {
  
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
            {this.props.idUsuario} 
        </Table.Cell>    
        <Table.Cell>
            {this.props.nombreUsuario} 
        </Table.Cell> 
        <Table.Cell>
            {this.props.contrasena} 
        </Table.Cell> 
        <Table.Cell>
            {this.props.correo}          
        </Table.Cell>
        <Table.Cell>
            {this.props.fotoPerfil}          
        </Table.Cell>
        <Table.Cell>
            <Button as={Link} to={`/editarUsuario/${this.props.idUsuario}`} color='purple'>Editar</Button>
            <Button onClick={this.open} color='red'>Borrar</Button>
              <Confirm content='¿Seguro que deseas borrar este usuario?'
                confirmButton='Si'
                cancelButton='No'
                open={this.state.open}
                onCancel={this.close}
                onConfirm={()=>this.props.onDeleteUsuario(this.props.idUsuario)}
              />
        </Table.Cell>
      </React.Fragment>
    );
  }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = UsuarioDetalle;