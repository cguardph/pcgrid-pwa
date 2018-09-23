import React/*, { Component }*/ from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"
import dateMath from "date-arithmetic";

import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import base from "../../rebase";
import matchSorter from 'match-sorter'

//for exporting data
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      showWithdrawal: false,
      deleteId: '',
      delete_registration_ref: '',    
      withdrawId: '',
      withdrawRef: '',

      delete_active_seed_wt: '',
      delete_base_seed_wt: '',
      reg_total_active_wt: '',
      reg_total_base_wt: '',
    };
    
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShowDelete = this.handleShowDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);

    this.handleShowWithdrawal = this.handleShowWithdrawal.bind(this);
    this.handleCloseWithdrawal = this.handleCloseWithdrawal.bind(this);       
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

  handleDelete(row, registration_ref, active_wt, base_wt){        
    base.get('registration/'+registration_ref, {
      context: this,          
    }).then(data => {
      this.setState({
        reg_total_active_wt: data.total_active_wt,
        reg_total_base_wt: data.total_base_wt
      });

      base.updateDoc('registration/'+registration_ref, { 
        total_active_wt: parseFloat(this.state.reg_total_active_wt) - parseFloat(active_wt),
        total_base_wt: parseFloat(this.state.reg_total_base_wt) - parseFloat(base_wt) 
      }).then(() => {
        //document is updated
    }).catch(err => {
      //handle error
    });   

    base.removeDoc('inventory/'+row)
      .then(() => {
        //document is deleted
      }).catch(err => {
      //handle error
    });

    this.handleCloseDelete();

    })      
  }

  handleShowDelete(row, registration_ref, active_wt, base_wt) {
    this.setState({
     showDelete: true,
     deleteId: row,
     delete_registration_ref: registration_ref,
     delete_active_seed_wt: active_wt,
     delete_base_seed_wt: base_wt,
   });    
  }

  handleCloseDelete() {
    this.setState({ showDelete: false });
  }

  handleShowWithdrawal(id, ref) {
    this.setState({
     showWithdrawal: true,
     withdrawId: id,
     withdrawRef: ref,
   });    
  }

  handleCloseWithdrawal() {
    this.setState({ showWithdrawal: false });
  }

  fetchFilteredData = () => {
    this.setState({
      filteredData: this.reactTable.getResolvedState().sortedData.map(d => d._original)   
    },
    function() { console.log(this.state.filteredData) }
    );     
  }

  render() {  
    const { fetchFilteredData } = this;
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
          Header: 'PHL NO',
          accessor: 'acc_no',
          className: 'center',
          id: "acc_no",
          // accessor: d => d.cguard_npgrl,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["acc_no"] }),
          filterAll: true
        },
        {
          Header: 'PLANTING DATE',
          accessor: 'planting_date',
          className: 'center',
          id: "planting_date",
          // accessor: d => d.planting_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["planting_date"] }),
          filterAll: true
        },
        {
          Header: 'HARVESTING DATE',
          accessor: 'harvesting_date',
          className: 'center',
          id: "harvesting_date",
          // accessor: d => d.harvesting_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["harvesting_date"] }),
          filterAll: true
        },      
        {
          Header: 'PACKAGING DATE',
          accessor: 'packaging_date',
          className: 'center',
          id: "packaging_date",
          // accessor: d => d.packaging_date,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["packaging_date"] }),
          filterAll: true
        },
        {
          Header: 'YEARS IN STORAGE',          
          // accessor: d => new Date("08/12/2016").toString(),
          accessor: d => dateMath.diff(new Date(d.packaging_date.replace(/-/g,'/')), new Date(), "year", "asFloat").toFixed(1),          
          // accessor: d => d.packaging_date.replace(/-/g,'/'),
          className: 'center',
          id: "years_in_storage",
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["years_in_storage"] }),
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
          Header: 'SEED WT',
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
          Header: 'SEED WT',
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
      width: 300,
      Cell:row => (
        <div>                
          <NavLink to={`/inventory/view/${row.original.id}`}>
            <Button bsStyle="info" bsSize="small">View</Button>&nbsp;&nbsp;            
          </NavLink>
          <Button bsStyle="info" bsSize="small" onClick={() => this.handleShowWithdrawal(row.original.id, row.original.regen_ref)} >Withdraw</Button>&nbsp;&nbsp; 
          <Button bsStyle="danger" bsSize="small" onClick={() => this.handleShowDelete(row.original.id, row.original.registration_ref, row.original.active_seed_wt, row.original.base_seed_wt)} >Delete</Button>
        </div>
      ),
      className: 'center',
      filterable: false
    } 
    ]
    const data = [{
      regen_ref: '1231',
      packaging_date: '01-01-2016',      
    }
    ]
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
        <p>** to create inventory data, go to <NavLink to="/registration/list">registration</NavLink></p>
        
        <ExcelFile element={<Button bsStyle="success" onClick={fetchFilteredData}>Download Data</Button>}>
            <ExcelSheet data={this.state.filteredData} name="Export">
                <ExcelColumn label="REGEN REF" value="regen_ref"/>
                <ExcelColumn label="PLANTING DATE" value="planting_date"/>
                <ExcelColumn label="HARVESTING DATE" value="harvesting_date"/>                
                <ExcelColumn label="PACKAGING DATE" value="packaging_date"/>                
                <ExcelColumn label="YEARS IN STORAGEE" value="years_in_storage"/>                
                <ExcelColumn label="TOTAL SEED WT" value="active_seed_wt"/>                
                <ExcelColumn label="GERMINATION" value="active_germination_rate"/>                
                <ExcelColumn label="STORE LOCATION" value="active_store_location"/>                
                <ExcelColumn label="REMARKS" value="active_remarks"/>                
                <ExcelColumn label="TOTAL SEED WT" value="base_seed_wt"/>                
                <ExcelColumn label="GERMINATION" value="base_germination_rate"/>                
                <ExcelColumn label="STORE LOCATION" value="base_store_location"/>                
                <ExcelColumn label="REMARKS" value="base_remarks"/>                                              
            </ExcelSheet>            
        </ExcelFile>

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
            <Button onClick={() => this.handleDelete(this.state.deleteId, this.state.delete_registration_ref, this.state.delete_active_seed_wt, this.state.delete_base_seed_wt)}>Delete</Button>          
            <Button onClick={this.handleCloseDelete}>Back to list</Button>            
          </Modal.Footer>
        </Modal> 

        <Modal show={this.state.showWithdrawal} onHide={this.handleCloseWithdrawal} animation={false}>
          <Modal.Header>
            <Modal.Title>Withdrawal</Modal.Title>
          </Modal.Header>
          <Modal.Body>             
            <p>
              Which type of withdrawal do you wish to perform?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <NavLink to={'/monitoring/create/'+this.state.withdrawId+'/'+this.state.withdrawRef}>
              <Button bsStyle="info" bsSize="small">Monitoring</Button>&nbsp;&nbsp;            
            </NavLink>  
            <NavLink to={'/distribution/create/'+this.state.withdrawId+'/'+this.state.withdrawRef}>
              <Button bsStyle="info" bsSize="small">Distribution</Button>&nbsp;&nbsp;            
            </NavLink>                            
            <Button onClick={this.handleCloseWithdrawal}>Cancel</Button>            
          </Modal.Footer>
        </Modal>         
      </div>
    );
  }
}
export default InventoryList;