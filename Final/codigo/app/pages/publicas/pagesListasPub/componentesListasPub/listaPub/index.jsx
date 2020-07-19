const React = require('react');
const { Table } = require ('semantic-ui-react');
//----------------------------------------------------------------------//

//------------------------------COMPONENTE------------------------------//
class ListaPub extends React.Component {

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
      </React.Fragment>
    );
  }
//----------------------------------------------------------------------//

};
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
module.exports = ListaPub;