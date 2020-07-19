const React = require('react');
const { Table } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class CartaPubDetalle extends React.Component {

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
                {this.props.img}          
            </Table.Cell>
            <Table.Cell>
                {this.props.firstEd}          
            </Table.Cell>
            <Table.Cell>
                {this.props.region}          
            </Table.Cell>
        </React.Fragment>
    );
  }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = CartaPubDetalle;