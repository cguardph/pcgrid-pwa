import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";
 
class CreateRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phl: '',
      npgrl_cereals_no: '',      
      gb_no: '',
      acc: '',
      apn: '',
      other_no: '',
      local_name: '',
      region: 'Region I',
      date_received: '',
      crop: 'Corn',
      genus: '',
      species: '',
      show: false
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ 
      phl: '',
      npgrl_cereals_no: '',      
      gb_no: '',
      acc: '',
      apn: '',
      other_no: '',
      local_name: '',
      region: 'Region I',
      date_received: '',
      crop: 'Corn',
      genus: '',
      species: '',
      show: false }); 
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
    const phl = this.state.phl;
    const npgrl_cereals_no = this.state.npgrl_cereals_no;    
    const gb_no = this.state.gb_no;
    const acc = this.state.acc;
    const apn = this.state.apn;
    const other_no = this.state.other_no;
    const local_name = this.state.local_name;
    const region = this.state.region;
    const date_received = this.state.date_received;
    const crop = this.state.crop;
    const genus = this.state.genus;
    const species = this.state.species;    

    const data = {
      phl,
      npgrl_cereals_no,      
      gb_no,
      acc,
      apn,
      other_no,
      local_name,
      region,
      date_received,
      crop,
      genus,
      species
    };    
    event.preventDefault();
    base.addToCollection('registration', data)
      .then(() => {
        //document is added to the collection
      }).catch(err => {
      //handle error
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Create Registration Data</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">      
            <label>
              PHL
              <input type="text" className="form-control" placeholder="PHL" value={this.state.phl} name="phl" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              NPGRL CEREALS NO
              <input type="text" className="form-control" placeholder="NPGRL CEREALS No" value={this.state.npgrl_cereals_no} name="npgrl_cereals_no" onChange={this.handleChange} />
            </label>          
          </div>                
          <div className="form-group">      
            <label>
              GB NO
              <input type="text" className="form-control" placeholder="GB No" value={this.state.gb_no} name="gb_no" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              ACC
              <input type="text" className="form-control" placeholder="ACC" value={this.state.acc} name="acc" onChange={this.handleChange} />
            </label>          
          </div>         
          <div className="form-group">      
            <label>
              APN
              <input type="text" className="form-control" placeholder="APN" value={this.state.apn} name="apn" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              OTHER NO
              <input type="text" className="form-control" placeholder="Other No" value={this.state.other_no} name="other_no" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              LOCAL NAME
              <input type="text" className="form-control" placeholder="Local Name" value={this.state.local_name} name="local_name" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              PHL REGION
              <select className="form-control" value={this.state.region} name="region" onChange={this.handleChange}>
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
            </label>          
          </div>
          <div className="form-group">      
            <label>
              DATE RECEIVED
              <input type="text" className="form-control" placeholder="Date Received" value={this.state.date_received} name="date_received" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              Crop
              <select className="form-control" value={this.state.crop} name="crop" onChange={this.handleChange}>                
                <option>Corn</option>
                <option>Adlay</option>
                <option>Sorghum</option>             
              </select>
            </label>          
          </div>
          <div className="form-group">      
            <label>
              GENUS
              <input type="text" className="form-control" placeholder="Genus" value={this.state.genus} name="genus" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              SPECIES
              <input type="text" className="form-control" placeholder="Species" value={this.state.species} name="species" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <Button type="submit" value="Submit" bsStyle="success" onClick={this.handleShow}>Create</Button>  
          </div>
        </form>  
        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>Successfully created registration data</Modal.Title>
          </Modal.Header>
          <Modal.Body>             
            <p>
              Would you like to create another or go back to list?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Create new</Button>
            <NavLink to="/registration/list">
              <Button onClick={this.handleClose}>Back to list</Button>
            </NavLink>
          </Modal.Footer>
        </Modal>      
      </div>
    );
  }
}
 
export default CreateRegistration;