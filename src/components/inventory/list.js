import React/*, { Component }*/ from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import base from "../../rebase";
import matchSorter from 'match-sorter'


class InventoryList extends React.Component {
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
    base.removeDoc('inventory/'+row)
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
      Header: " ",    
      columns: [
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
          Header: 'ACC NO',
          accessor: 'acc_no',
          className: 'center',
          id: "acc_no",
          // accessor: d => d.cguard_npgrl,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["acc_no"] }),
          filterAll: true
        },
      ]
    },
    {
      Header: 'ACTIVE',
      headerStyle: {
        backgroundColor: "blue",
      },
      columns: [
        {
          Header: 'TOTAL SEED WT',
          accessor: 'active_seed_wt',
          className: 'center',
          id: "active_seed_wt",
          // accessor: d => d.active_seed_wt,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["active_seed_wt"] }),
          filterAll: true
        },
        {
          Header: '% GERMINATION',
          accessor: 'active_germination_rate',
          className: 'center',
          id: "active_germination_rate",
          // accessor: d => d.active_germination_rate,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["active_germination_rate"] }),
          filterAll: true
        },
        {
          Header: 'PLANTING DATE',
          accessor: 'active_planting_date',
          className: 'center',
          id: "active_planting_date",
          // accessor: d => d.active_planting_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["active_planting_date"] }),
          filterAll: true
        },
        {
          Header: 'HARVESTING DATE',
          accessor: 'active_harvesting_date',
          className: 'center',
          id: "active_harvesting_date",
          // accessor: d => d.active_harvesting_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["active_harvesting_date"] }),
          filterAll: true
        },      
        {
          Header: 'PACKAGING DATE',
          accessor: 'active_packaging_date',
          className: 'center',
          id: "active_packaging_date",
          // accessor: d => d.active_packaging_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["active_packaging_date"] }),
          filterAll: true
        },
        {
          Header: 'STORE LOCATION',
          accessor: 'active_store_location',
          className: 'center',
          id: "active_store_location",
          // accessor: d => d.active_store_location,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["active_store_location"] }),
          filterAll: true
        },
        {
          Header: 'REMARKS',
          accessor: 'active_remarks',
          className: 'center',
          id: "active_remarks",
          // accessor: d => d.active_remarks,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["active_remarks"] }),
          filterAll: true
        }
      ]
    },
    {
      Header: 'BASE',
      headerStyle: {
        backgroundColor: "red",
      },
      columns: [
        {
          Header: 'TOTAL SEED WT',
          accessor: 'base_seed_wt',
          className: 'center',
          id: "base_seed_wt",
          // accessor: d => d.base_seed_wt,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["base_seed_wt"] }),
          filterAll: true
        },
        {
          Header: '% GERMINATION',
          accessor: 'base_germination_rate',
          className: 'center',
          id: "base_germination_rate",
          // accessor: d => d.base_germination_rate,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["base_germination_rate"] }),
          filterAll: true
        },
        {
          Header: 'PLANTING DATE',
          accessor: 'base_planting_date',
          className: 'center',
          id: "base_planting_date",
          // accessor: d => d.base_planting_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["base_planting_date"] }),
          filterAll: true
        },
        {
          Header: 'HARVESTING DATE',
          accessor: 'base_harvesting_date',
          className: 'center',
          id: "base_harvesting_date",
          // accessor: d => d.base_harvesting_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["base_harvesting_date"] }),
          filterAll: true
        },      
        {
          Header: 'PACKAGING DATE',
          accessor: 'base_packaging_date',
          className: 'center',
          id: "base_packaging_date",
          // accessor: d => d.base_packaging_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["base_packaging_date"] }),
          filterAll: true
        },
        {
          Header: 'STORE LOCATION',
          accessor: 'base_store_location',
          className: 'center',
          id: "base_store_location",
          // accessor: d => d.base_store_location,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["base_store_location"] }),
          filterAll: true
        },
        {
          Header: 'REMARKS',
          accessor: 'base_remarks',
          className: 'center',
          id: "base_remarks",
          // accessor: d => d.base_remarks,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["base_remarks"] }),
          filterAll: true
        }
      ]
    },
    {
      Header: '',
      Cell:row => (
        <div>                
          <NavLink to={`/inventory/view/${row.original.id}`}>
            <Button bsStyle="info" bsSize="small">View</Button>&nbsp;&nbsp;            
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
        <p>** to create inventory data go to <NavLink to="/registration/list">registration</NavLink></p>
        
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
export default InventoryList;