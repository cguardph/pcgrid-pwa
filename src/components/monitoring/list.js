import React/*, { Component }*/ from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"
import dateMath from "date-arithmetic";

import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import base from "../../rebase";
import matchSorter from 'match-sorter'


class RegenerationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showWithdrawal: false,
      deleteId: '',      
    };
    
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShowDelete = this.handleShowDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);        
  }

  /*renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };  */

  handleDelete(row){    
    base.removeDoc('regeneration/'+row)
      .then(() => {
        //document is deleted
      }).catch(err => {
      //handle error
    });
    this.handleCloseDelete();
  }

  handleShowDelete(row) {
    this.setState({
     showDelete: true,
     deleteId: row
   });    
  }

  handleCloseDelete() {
    this.setState({ showDelete: false });
  }
  

  render() {  
    /*var styles = {      
    };*/
    const columns = [
    {      
      Header: 'REGEN REF',
      accessor: 'regen_ref',
      className: 'center',
      id: "regen_ref",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["regen_ref"] }),
      filterAll: true  
    },
    {
      Header: '',
      width: 300,
      Cell:row => (
        <div>                
          <NavLink to={`/regeneration/view/${row.original.id}`}>
            <Button bsStyle="info" bsSize="small">View</Button>&nbsp;&nbsp;            
          </NavLink>          
          <Button bsStyle="danger" bsSize="small" onClick={() => this.handleShowDelete(row.original.id)} >Delete</Button>
        </div>
      ),
      className: 'center',
      filterable: false
    }
    ]
    const data = [{
      regen_ref: "12345",
      packaging_date: "01-15-2017",
      active_seed_wt: 100,
      id: "nyahaha",
    }]
    /*var listItems = */this.props.items.map((item, index) => {
      return (
        data.push(item)        
        /*<li key={index} className="list-group-item" style={styles.listGroup}>
          <button
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={this.props.remove.bind(null, item.ref)}
          />
          <span style={styles.todoItem}>{item.apn}</span>
        </li>*/
      );
    });
    return (   
      <div className="container">              
        <p>** to perform withdrawal, go to <NavLink to="/inventory/list">inventory</NavLink></p>
        
        <ReactTable
          data={data}        
          columns={columns}
          pageSize={10}          
          className="-striped -highlight"
          defaultSorted={[{
            id: 'phl',
            desc: true          
          }]}  
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}     
        />

        <Modal show={this.state.showDelete} onHide={this.handleCloseDelete} animation={false}>
          <Modal.Header>
            <Modal.Title>Caution!</Modal.Title>
          </Modal.Header>
          <Modal.Body>             
            <p>
              Are you sure you want to delete this record? This action is irreversible.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleDelete(this.state.deleteId)}>Delete</Button>          
            <Button onClick={this.handleCloseDelete}>Back to list</Button>            
          </Modal.Footer>
        </Modal>         
      </div>
    );
  }
}
export default RegenerationList;