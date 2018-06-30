import React/*, { Component }*/ from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import base from "../rebase";
import matchSorter from 'match-sorter'


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      deleteId: ''
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
    base.removeDoc('registration/'+row)
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
      Header: 'CGUARD Region',
      accessor: 'cguard_region',
      className: 'center',
      id: "cguard_region",
      // accessor: d => d.cguard_region,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["cguard_region"] }),
      filterAll: true
    }, 
    {
      Header: 'CGUARD N',
      accessor: 'cguard_n',
      className: 'center',
      id: "cguard_n",
      // accessor: d => d.cguard_n,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["cguard_n"] }),
      filterAll: true
    },
    {
      Header: 'CGUARD NPGRL',
      accessor: 'cguard_npgrl',
      className: 'center',
      id: "cguard_npgrl",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["cguard_npgrl"] }),
      filterAll: true
    },
    {
      Header: 'GB No',
      accessor: 'gb_no',
      className: 'center',
      id: "gb_no",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["gb_no"] }),
      filterAll: true
    },
    {
      Header: 'APN',
      accessor: 'apn',
      className: 'center',
      id: "apn",
      // accessor: d => d.apn,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["apn"] }),
      filterAll: true
    },    
    {
      Header: 'Local Name',
      accessor: 'local_name',
      className: 'center',
      id: "local_name",
      // accessor: d => d.local_name,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["local_name"] }),
      filterAll: true
    },
    {
      Header: 'Region',
      accessor: 'region',
      className: 'center',
      id: "region",
      // Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value) {      
          return row[filter.id] === filter.value;
        }
        return row[filter.id] < 21;
      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option>Region I</option>
          <option>Region II</option>
          <option>Region III</option>
          <option>Region IV</option>
          <option>Region V</option>
          <option>Region VI</option>
          <option>Region VII</option>
          <option>Region VIII</option>
          <option>Region IX</option>
          <option>Region XI</option>
          <option>Region XII</option>
        </select>
    },
    {
      Header: '',
      Cell:row => (
        <div>      
          <NavLink to ={`registration/update/${row.original.id}`}>
            <Button bsStyle="warning" bsSize="small">Edit</Button>&nbsp;&nbsp;            
          </NavLink>
          <Button bsStyle="danger" bsSize="small" onClick={() => this.handleShowDelete(row.original.id)} >Delete</Button>
        </div>
      ),
      className: 'center',
      filterable: false
    }
    ]
    const data = []
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
        <NavLink to ="registration/create">
          <Button bsStyle="success">
            Create Registration Data
          </Button>
        </NavLink>
        
        <ReactTable
          data={data}        
          columns={columns}
          pageSize={10}          
          className="-striped -highlight"
          defaultSorted={[{
            id: 'cguard_region',
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
export default List;