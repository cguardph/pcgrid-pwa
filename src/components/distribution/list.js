import React/*, { Component }*/ from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"
import dateMath from "date-arithmetic";

import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import base from "../../rebase";
import matchSorter from 'match-sorter'


class DistributionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showWithdrawal: false,
      deleteId: '',     

      delete_registration_ref: '',
      delete_inventory_ref: '',
      delete_amount_dispatched: '',

      reg_total_active_wt: '',
      inv_active_seed_wt: '',
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

  handleDelete(row, registration_ref, inventory_ref, amount_dispatched){   
    base.get('registration/'+registration_ref, {
      context: this,          
    }).then(data => {
      this.setState({
        reg_total_active_wt: data.total_active_wt,        
      });

      base.updateDoc('registration/'+registration_ref, { 
        total_active_wt: parseFloat(this.state.reg_total_active_wt) + parseFloat(amount_dispatched),       
        }).then(() => {
          //document is updated
      }).catch(err => {
        //handle error
      }); 
    });

    base.get('inventory/'+inventory_ref, {
      context: this,          
    }).then(data => {
      this.setState({
        inv_active_seed_wt: data.active_seed_wt,        
      });

      base.updateDoc('inventory/'+inventory_ref, { 
        active_seed_wt: parseFloat(this.state.inv_active_seed_wt) + parseFloat(amount_dispatched),       
      }).then(() => {
        //document is updated
      }).catch(err => {
        //handle error
      }); 

      base.removeDoc('distribution/'+row)
        .then(() => {
          //document is deleted
        }).catch(err => {
        //handle error
      });    
    this.handleCloseDelete();
    });
  }

  handleShowDelete(row, registration_ref, inventory_ref, amount_dispatched) {
    this.setState({
     showDelete: true,
     deleteId: row,
     delete_registration_ref: registration_ref,
     delete_inventory_ref: inventory_ref,
     delete_amount_dispatched: amount_dispatched
   });    
  }

  handleCloseDelete() {
    this.setState({ showDelete: false });
  }
  
  render() {  
    const { fetchFilteredData } = this;
    /*var styles = {      
    };*/
    const columns = [
    {            
      Header: 'GERMPLASM REQUEST NUMBER',
      accessor: 'germ_req_no',
      className: 'center',
      id: "germ_req_no",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["germ_req_no"] }),
      filterAll: true
    },  
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
      Header: 'RECIPIENT',
      accessor: 'recipient_name',
      className: 'center',
      id: "recipient_name",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["recipient_name"] }),
      filterAll: true
    },    
    {
      Header: 'ADDRESS',
      accessor: 'recipient_address',
      className: 'center',
      id: "recipient_address",
      // accessor: d => d.recipient_address,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["recipient_address"] }),
      filterAll: true
    },      
    {
      Header: 'AMOUNT DISPATCHED',
      accessor: 'amount_dispatched',
      className: 'center',
      id: "amount_dispatched",
      // accessor: d => d.amount_dispatched,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["amount_dispatched"] }),
      filterAll: true
    },
    {
      Header: 'PURPOSE',
      accessor: 'purpose',
      className: 'center',
      id: "purpose",
      // accessor: d => d.purpose,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["purpose"] }),
      filterAll: true
    },
    {
      Header: 'DATE REQUESTED',
      accessor: 'date_requested',
      className: 'center',
      id: "date_requested",
      // accessor: d => d.date_requested,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["date_requested"] }),
      filterAll: true
    },
    {
      Header: 'DATE DISPATCHED',
      accessor: 'date_dispatched',
      className: 'center',
      id: "date_dispatched",
      // accessor: d => d.date_dispatched,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["date_dispatched"] }),
      filterAll: true
    },
    {
      Header: 'INSTITUTION',
      accessor: 'institution',
      className: 'center',
      id: "institution",
      // accessor: d => d.institution,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["institution"] }),
      filterAll: true
    },
    {
      Header: 'CONTACT NO',
      accessor: 'contact_number',
      className: 'center',
      id: "contact_number",
      // accessor: d => d.contact_number,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["contact_number"] }),
      filterAll: true
    },
    {
      Header: 'EMAIL',
      accessor: 'email',
      className: 'center',
      id: "email",
      // accessor: d => d.email,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["email"] }),
      filterAll: true
    },
    {
      Header: 'MODE',
      accessor: 'mode',
      className: 'center',
      id: "mode",
      // accessor: d => d.mode,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["mode"] }),
      filterAll: true
    },
    {
      Header: 'MTA MATTERS',
      accessor: 'mta_matters',
      className: 'center',
      id: "mta_matters",
      // accessor: d => d.mta_matters,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["mta_matters"] }),
      filterAll: true
    },
    {
      Header: 'REMARKS',
      accessor: 'remarks',
      className: 'center',
      id: "remarks",
      // accessor: d => d.remarks,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["remarks"] }),
      filterAll: true
    },              
    {
      Header: '',
      width: 300,
      Cell:row => (
        <div>                
          <NavLink to= {{
            pathname: '/distribution/view/',
            state: {
              id: row.original.id
            }
          }} >
            <Button bsStyle="info" bsSize="small">View</Button>&nbsp;&nbsp;            
          </NavLink>          
          <Button bsStyle="danger" bsSize="small" onClick={() => this.handleShowDelete(row.original.id, row.original.registration_ref, row.original.inventory_ref, row.original.amount_dispatched)} >Delete</Button>
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
        <p>** to perform withdrawal, go to <NavLink to="/inventory/list">inventory</NavLink></p>
        
        <ReactTable
          ref={(r)=>this.reactTable=r}
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
            <Button onClick={() => this.handleDelete(this.state.deleteId, this.state.delete_registration_ref, this.state.delete_inventory_ref, this.state.delete_amount_dispatched)}>Delete</Button>          
            <Button onClick={this.handleCloseDelete}>Back to list</Button>            
          </Modal.Footer>
        </Modal>         
      </div>
    );
  }
}
export default DistributionList;