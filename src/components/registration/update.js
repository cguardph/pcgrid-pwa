import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";

import Loader from "../loader"; 

class UpdateRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      npgrl_cereals_no: '',
      gb_no: '',
      phl: '',
      acc: '',
      apn: '',
      other_no: '',
      local_name: '',
      region: '',
      donor_source: '',
      country: '',
      date_received: '',
      crop: '',
      genus: '',
      species: '',
      total_active_wt: '',
      total_base_wt: '',
      conservation_stat: '',
      loading: true,
      show: false,
      regId: this.props.location.state.id
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.ref = base.bindDoc('registration/'+this.state.regId, {
      context: this,      
      withRefs: true,
      withIds: true,
      then() {        
        this.setState({ loading: false });
      }
    });
  }

  handleClose() {
    this.setState({ show: false }); 
  }

  handleShow() {
    this.setState({ show: true });    
  }

  handleChange(event) {    
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const npgrl_cereals_no = this.state.npgrl_cereals_no;
    const gb_no = this.state.gb_no;
    const phl = this.state.phl;
    const acc = this.state.acc;
    const other_no = this.state.other_no;
    const apn = this.state.apn;
    const local_name = this.state.local_name;
    const region = this.state.region;
    const donor_source = this.state.donor_source;
    const country = this.state.country;
    const date_received = this.state.date_received;
    const crop = this.state.crop;
    const genus = this.state.genus;
    const species = this.state.species;
    const total_active_wt = this.state.total_active_wt;
    const total_base_wt = this.state.total_base_wt;
    const conservation_stat = this.state.conservation_stat;

    const data = {
      npgrl_cereals_no,     
      gb_no,
      phl,
      acc,
      other_no,
      apn,
      local_name,
      region,
      donor_source,
      country,
      date_received,
      crop,
      genus,
      species,
      total_active_wt,
      total_base_wt,
      conservation_stat,
    };    
    event.preventDefault();
    base.updateDoc('registration/'+this.state.regId, data)
      .then(() => {
        //document is added to the collection
      }).catch(err => {
      //handle error
    });
  }

  render() {
    
    return (
      <div className="container">
        <h2>Update Registration Data</h2>

        {this.state.loading === true ? (
            <Loader />
          ) : (
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>PHL NO</label>          
                  <input type="text" className="form-control" placeholder="PHL" value={this.state.phl} name="phl" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">                        
                  <label style={{ marginRight: '10px' }}>NPGRL CEREALS NO</label>          
                  <input type="text" className="form-control" placeholder="NPGRL CEREALS No" value={this.state.npgrl_cereals_no} name="npgrl_cereals_no" onChange={this.handleChange} />                  
                </div>                      
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>GB NO</label>          
                  <input type="text" className="form-control" placeholder="GB No" value={this.state.gb_no} name="gb_no" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>OLD ACC NO</label>          
                  <input type="text" className="form-control" placeholder="ACC" value={this.state.acc} name="acc" onChange={this.handleChange} />
                </div>         
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>APN</label>          
                  <input type="text" className="form-control" placeholder="APN" value={this.state.apn} name="apn" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>'OTHER NO'</label>          
                  <input type="text" className="form-control" placeholder="Other No" value={this.state.other_no} name="other_no" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>LOCAL NAME</label>          
                  <input type="text" className="form-control" placeholder="Local Name" value={this.state.local_name} name="local_name" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>PHL REGION</label>          
                  <select className="form-control" value={this.state.region} name="region" onChange={this.handleChange}>
                    <option label=""></option>
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
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>DONOR/SOURCE</label>          
                  <input type="text" className="form-control" placeholder="Donor/Source" value={this.state.donor_source} name="donor_source" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>COUNTRY</label>          
                  <input type="text" className="form-control" placeholder="Country" value={this.state.country} name="country" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>DATE RECEIVED</label>          
                  <input type="text" className="form-control" placeholder="Date Received" value={this.state.date_received} name="date_received" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>Crop</label>          
                  <select className="form-control" value={this.state.crop} name="crop" onChange={this.handleChange}>                
                    <option label=""></option>
                    <option>Corn</option>
                    <option>Adlay</option>
                    <option>Sorghum</option>             
                    <option>Millet</option>            
                  </select>
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>GENUS</label>          
                  <input type="text" className="form-control" placeholder="Genus" value={this.state.genus} name="genus" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>SPECIES</label>          
                  <input type="text" className="form-control" placeholder="Species" value={this.state.species} name="species" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>TOTAL ACTIVE WT</label>          
                  <input type="text"  className="form-control" placeholder="Total Active Wt" value={this.state.total_active_wt} name="total_active_wt" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>TOTAL BASE WT</label>          
                  <input type="text" className="form-control" placeholder="Total Base Wt" value={this.state.total_base_wt} name="total_base_wt" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>CONSERVATION STATUS</label>          
                  <select className="form-control" value={this.state.conservation_stat} name="conservation_stat" onChange={this.handleChange}>                
                    <option label=""></option>
                    <option>LIVE</option>
                    <option>DEAD</option>            
                  </select>
                </div>
                <div className="form-group form-inline">      
                  <Button type="submit" value="Submit" bsStyle="success" onClick={this.handleShow}>Update</Button>  
                  <NavLink to ={"/registration/view/"+this.state.regId}>
                    <Button onClick={this.handleClose}>Back to view</Button>
                  </NavLink>
                </div>
              </form>  
              <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header>
                  <Modal.Title>Successfully updated registration data</Modal.Title>
                </Modal.Header>                
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Update again</Button>
                  <NavLink to="/registration/list">
                    <Button onClick={this.handleClose}>Back to list</Button>
                  </NavLink>
                </Modal.Footer>
              </Modal>      
            </div>
          )}         
      </div>
    );
  }
}
 
export default UpdateRegistration;