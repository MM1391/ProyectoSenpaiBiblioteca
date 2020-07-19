const React = require('react');
const { Link } = require ('react-router-dom');
const { Button, Table } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class CartaPub extends React.Component {

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
            {this.props.firstEd}          
        </Table.Cell>
        <Table.Cell>
            {this.props.region}          
        </Table.Cell>
        <Table.Cell>
            <Button as={Link} to={`/detalleCartaPub/${this.props.idCarta}`} color='yellow'>Ir al Detalle</Button>
        </Table.Cell>
      </React.Fragment>
    );
  }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = CartaPub;