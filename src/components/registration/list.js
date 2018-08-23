//add ref={r => (this.checkboxTable = r)} to CheckboxTable
// s{...checkboxProps}
import React/*, { Component }*/ from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import dateMath from "date-arithmetic";

//for routing
import { NavLink } from "react-router-dom";

//for modals
import { Modal, Button } from "react-bootstrap";
import base from "../../rebase";

//for filtering table data
import matchSorter from 'match-sorter';

//for checkbox
import checkboxHOC from "react-table/lib/hoc/selectTable";
import CBReactTablePagination from "../../helpers/cbreacttablepagination";

//for exporting data
import ReactExport from "react-data-export";

const CheckboxTable = checkboxHOC(ReactTable);

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class RegistrationList extends React.Component {
  constructor(props) {
    super(props);        
    this.state = {
      showDelete: false,
      deleteId: '',
      selection: [],
      filteredData: props,
      selectAll: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShowDelete = this.handleShowDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
  }

  handleChange(event) {    
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  toggleSelection = (key, shift, row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?
      
      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).
      
      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).
      
      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'. 
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {            
        selection.push(item._original.id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };

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

  logSelection = () => {
    this.setState({
      filteredData: this.reactTable.getResolvedState().sortedData.map(d => d._original)   
    });      
    console.log(new Date("08-14-2014"));
    // console.log(dateMath.diff(new Date("08-14-2014"), new Date(), "year", "asFloat"))
    // console.log("selection: ", this.state.selection;
  };

  fetchFilteredData = () => {
    this.setState({
      filteredData: this.reactTable.getResolvedState().sortedData.map(d => d._original)   
    },
    function() { console.log(this.state.filteredData) }
    );     
  }

  render() {
    const { toggleSelection, toggleAll, isSelected, logSelection, fetchFilteredData } = this;
    const { selectAll } = this.state.selectAll;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      getTrProps: (s, r) => {
        // someone asked for an example of a background color change
        // here it is...          
        const selected = this.isSelected(r.original.id);
        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit"
            // color: selected ? 'white' : 'inherit',
          }
        };
      }
    };
    /*var styles = {      
    };*/
    const columns = [
    {
      Header: 'PHL NO',
      accessor: 'phl',
      className: 'center',
      id: "phl",
      // accessor: d => d.gb_no,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["phl"] }),
      filterAll: true
    },   
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
      Header: 'OLD ACC NO',
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
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value) {      
          return row[filter.id] === filter.value;
        }        
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
          <option>Region IVA</option>
          <option>Region IVB</option>
          <option>Region V</option>
          <option>Region VI</option>
          <option>Region VII</option>
          <option>Region VIII</option>
          <option>Region IX</option>
          <option>Region X</option>
          <option>Region XI</option>
          <option>Region XII</option>
          <option>Region XIII</option>          
          <option>CAR</option>              
          <option>ARMM</option>  
        </select>
    },
    {
      Header: 'DONOR/SOURCE',
      accessor: 'donor_source',
      className: 'center',
      id: 'donor_source',
      // accessor: d => d.donor_source,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["donor_source"] }),
      filterAll: true
    },
    {
      Header: 'COUNTRY',
      accessor: 'country',
      className: 'center',
      id: "country",
      // accessor: d => d.country,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["country"] }),
      filterAll: true
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
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value) {      
          return row[filter.id] === filter.value;
        }
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
          <option>Millet</option>          
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
      width: 300,
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
    const data = [
    {
      'phl' : '12345'
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
      <div className="table">            
        <NavLink to ="/registration/create">
          <Button bsStyle="success">
            Create Registration
          </Button>
        </NavLink>
        <ExcelFile element={<Button bsStyle="success" onClick={fetchFilteredData}>Download Data</Button>}>
            <ExcelSheet data={this.state.filteredData} name="Export">
                <ExcelColumn label="PHL NO" value="phl"/>
                <ExcelColumn label="NPGRL CEREALS NO" value="npgrl_cereals_no"/>
                <ExcelColumn label="GB NO" value="gb_no"/>                
                <ExcelColumn label="OLD ACC NO" value="acc"/>                
                <ExcelColumn label="APN" value="apn"/>                
                <ExcelColumn label="OTHER NO" value="other_no"/>                
                <ExcelColumn label="LOCAL NAME" value="local_name"/>                
                <ExcelColumn label="PHL REGION" value="region"/>                
                <ExcelColumn label="DONOR/SOURCE" value="donor_source"/>                
                <ExcelColumn label="COUNTRY" value="country"/>                
                <ExcelColumn label="DATE RECEIVED" value="date_received"/>                
                <ExcelColumn label="CROP" value="crop"/>                
                <ExcelColumn label="GENUS" value="genus"/>
                <ExcelColumn label="SPECIES" value="species"/>                                              
            </ExcelSheet>            
        </ExcelFile>
        <Button bstyle="info" onClick={logSelection}>Log Selection</Button>
        <ReactTable     
          ref={(r)=>this.reactTable=r}    
          data={data}        
          columns={columns}                
          className="-striped -highlight"
          defaultSorted={[{
            id: 'npgrl_cereals_no',
            desc: false          
          }]}  
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value} 
          PaginationComponent={CBReactTablePagination}  
          showPaginationTop={true}  
          showPaginationBottom={true}            
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