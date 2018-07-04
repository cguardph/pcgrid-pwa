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
    base.removeDoc('passport/'+row)
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
      Header: 'Collector',
      accessor: 'collector',
      className: 'center',
      id: "collector",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["collector"] }),
      filterAll: true
    },
    {
      Header: 'Institute',
      accessor: 'institute',
      className: 'center',
      id: "institute",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["institute"] }),
      filterAll: true
    },
    {
      Header: 'Date Collected',
      accessor: 'date_collected',
      className: 'center',
      id: "date_collected",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["date_collected"] }),
      filterAll: true
    },
    {
      Header: 'Province',
      accessor: 'province',
      className: 'center',
      id: "province",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["province"] }),
      filterAll: true
    },
    {
      Header: 'Municipality',
      accessor: 'municipality',
      className: 'center',
      id: "municipality",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["municipality"] }),
      filterAll: true
    },
    {
      Header: 'Barangay',
      accessor: 'barangay',
      className: 'center',
      id: "barangay",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["barangay"] }),
      filterAll: true
    },
    {
      Header: 'Sitio/Purok',
      accessor: 'sitio',
      className: 'center',
      id: "sitio",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["sitio"] }),
      filterAll: true
    },
    {
      Header: 'Latitude',
      accessor: 'latitude',
      className: 'center',
      id: "latitude",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["latitude"] }),
      filterAll: true
    },
    {
      Header: 'Longitude',
      accessor: 'longitude',
      className: 'center',
      id: "longitude",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["longitude"] }),
      filterAll: true
    },
    {
      Header: 'Altitude',
      accessor: 'altitude',
      className: 'center',
      id: "altitude",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["altitude"] }),
      filterAll: true
    },
    {
      Header: 'Meaning of Name',
      accessor: 'name_meaning',
      className: 'center',
      id: "name_meaning",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["name_meaning"] }),
      filterAll: true
    },
    {
      Header: 'Dialect',
      accessor: 'dialect',
      className: 'center',
      id: "dialect",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["dialect"] }),
      filterAll: true
    },
    {
      Header: 'Date Planted',
      accessor: 'date_planted',
      className: 'center',
      id: "date_planted",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["date_planted"] }),
      filterAll: true
    },
    {
      Header: 'Date Harvested',
      accessor: 'date_harvested',
      className: 'center',
      id: "date_harvested",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["date_harvested"] }),
      filterAll: true
    },
    {
      Header: 'Source/Grower Name',
      accessor: 'source',
      className: 'center',
      id: "source",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["source"] }),
      filterAll: true
    },
    {
      Header: 'Contact Info',
      accessor: 'contact',
      className: 'center',
      id: "contact",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["contact"] }),
      filterAll: true
    },
    {
      Header: 'Photograph No',
      accessor: 'photograph_no',
      className: 'center',
      id: "photograph_no",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["photograph_no"] }),
      filterAll: true
    },
    {
      Header: 'Collecting Source',
      accessor: 'collecting_source',
      className: 'center',
      id: "collecting_source",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["collecting_source"] }),
      filterAll: true
    },
    {
      Header: 'Sample Type',
      accessor: 'sample_type',
      className: 'center',
      id: "sample_type",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["sample_type"] }),
      filterAll: true
    },
    {
      Header: 'Genetic Status',
      accessor: 'genetic_status',
      className: 'center',
      id: "genetic_status",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["genetic_status"] }),
      filterAll: true
    },
    {
      Header: 'Sampling Method',
      accessor: 'sampling_method',
      className: 'center',
      id: "sampling_method",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["sampling_method"] }),
      filterAll: true
    },
    {
      Header: 'Topography',
      accessor: 'topography',
      className: 'center',
      id: "topography",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["topography"] }),
      filterAll: true
    },
    {
      Header: 'Site',
      accessor: 'site',
      className: 'center',
      id: "site",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["site"] }),
      filterAll: true
    },
    {
      Header: 'Soil Texture',
      accessor: 'soil_texture',
      className: 'center',
      id: "soil_texture",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["soil_texture"] }),
      filterAll: true
    },
    {
      Header: 'Soil backgroundColor',
      accessor: 'soil_color',
      className: 'center',
      id: "soil_color",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["soil_color"] }),
      filterAll: true
    },
    {
      Header: 'Stoniness',
      accessor: 'stoniness',
      className: 'center',
      id: "stoniness",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["stoniness"] }),
      filterAll: true
    },
    {
      Header: 'Farming/Cultural Practice',
      accessor: 'culural_practice',
      className: 'center',
      id: "culural_practice",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["culural_practice"] }),
      filterAll: true
    },
    {
      Header: 'Sowing',
      accessor: 'sowing',
      className: 'center',
      id: "sowing",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["sowing"] }),
      filterAll: true
    },
    {
      Header: 'Irrigation/Water Source',
      accessor: 'water_source',
      className: 'center',
      id: "water_source",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["water_source"] }),
      filterAll: true
    },
    {
      Header: 'Drainage',
      accessor: 'drainage',
      className: 'center',
      id: "drainage",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["drainage"] }),
      filterAll: true
    },
    {
      Header: 'Crop Sequence',
      accessor: 'crop_sequence',
      className: 'center',
      id: "crop_sequence",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["crop_sequence"] }),
      filterAll: true
    },
    {
      Header: 'Fertilizer Mgt Practice',
      accessor: 'fertilizer_management',
      className: 'center',
      id: "fertilizer_management",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["fertilizer_management"] }),
      filterAll: true
    },
    {
      Header: 'Pest/Weed Mgt Practice',
      accessor: 'pest_management',
      className: 'center',
      id: "pest_management",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["pest_management"] }),
      filterAll: true
    },
    {
      Header: 'Usage',
      accessor: 'usage',
      className: 'center',
      id: "usage",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["usage"] }),
      filterAll: true
    },
    {
      Header: 'Key Desc of Cultivar',
      accessor: 'key_desc_of_cultivar',
      className: 'center',
      id: "key_desc_of_cultivar",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["key_desc_of_cultivar"] }),
      filterAll: true
    },
    {
      Header: 'Years in Possession',
      accessor: 'years_in_possession',
      className: 'center',
      id: "years_in_possession",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["years_in_possession"] }),
      filterAll: true
    },
    {
      Header: 'Additional Notes',
      accessor: 'additional_notes',
      className: 'center',
      id: "additional_notes",
      // accessor: d => d.cguard_npgrl,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["additional_notes"] }),
      filterAll: true
    },    
    {
      Header: '',
      Cell:row => (
        <div>      
          <NavLink to ={`/passport/update/${row.original.id}`}>
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
        <p>** to create passport data go to <NavLink to="/registration/list">registration</NavLink></p>
        
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