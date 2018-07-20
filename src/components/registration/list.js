import React/*, { Component }*/ from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import base from "../../rebase";
import matchSorter from 'match-sorter'


class RegistrationList extends React.Component {
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
      Header: 'PHL',
      accessor: 'phl',
      className: 'center',
      id: "phl",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["phl"] }),
      filterAll: true
    },
    /*{
      Header: 'CGUARD Region',
      accessor: 'cguard_region',
      className: 'center',
      id: "cguard_region",
      // accessor: d => d.cguard_region,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["cguard_region"] }),
      filterAll: true
    },*/     
    {
      Header: 'NPGRL CEREALS NO',
      accessor: 'npgrl_cereals_no',
      className: 'center',
      id: "npgrl_cereals_no",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["npgrl_cereals_no"] }),
      filterAll: true
    },
    {
      Header: 'GB NO',
      accessor: 'gb_no',
      className: 'center',
      id: "gb_no",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["gb_no"] }),
      filterAll: true
    },
    {
      Header: 'ACC',
      accessor: 'acc',
      className: 'center',
      id: "acc",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["acc"] }),
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
      Header: 'OTHER NO',
      accessor: 'other_no',
      className: 'center',
      id: "other_no",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["other_no"] }),
      filterAll: true
    },      
    {
      Header: 'LOCAL NAME',
      accessor: 'local_name',
      className: 'center',
      id: "local_name",
      // accessor: d => d.local_name,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["local_name"] }),
      filterAll: true
    },
    {
      Header: 'PHL REGION',
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
      Header: 'DATE RECEIVED',
      accessor: 'date_received',
      className: 'center',
      id: "date_received",
      // accessor: d => d.date_received,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["date_received"] }),
      filterAll: true
    },
    {
      Header: 'CROP',
      accessor: 'crop',
      className: 'center',
      id: "crop",
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
          <option>Corn</option>
          <option>Adlay</option>
          <option>Sorghum</option>          
        </select>
    },
    {
      Header: 'GENUS',
      accessor: 'genus',
      className: 'center',
      id: "genus",
      // accessor: d => d.genus,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["genus"] }),
      filterAll: true
    },
    {
      Header: 'SPECIES',
      accessor: 'species',
      className: 'center',
      id: "species",
      // accessor: d => d.species,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["species"] }),
      filterAll: true
    },
    {
      Header: '',
      Cell:row => (
        <div>                
          <NavLink to={`/registration/view/${row.original.id}`}>
            <Button bsStyle="info" bsSize="small">View</Button>&nbsp;&nbsp;            
          </NavLink>
          <NavLink to={`/inventory/create/${row.original.id}/${row.original.phl}`} >
            <Button bsStyle="info" bsSize="small">Create Inventory Entry</Button>&nbsp;&nbsp;            
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
        <NavLink to ="/registration/create">
          <Button bsStyle="success">
            Create Registration
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
export default RegistrationList;