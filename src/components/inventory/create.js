import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";
 
class CreateInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registration_ref: this.props.match.params.regId,
      regen_ref: '',
      acc_no: this.props.match.params.acc,
      active_seed_wt: '',
      active_germination_rate: '',
      active_planting_date: '',
      active_harvesting_date: '',
      active_packaging_date: '',
      active_store_location: '',
      active_remarks: '',
      base_seed_wt: '',
      base_germination_rate: '',
      base_planting_date: '',
      base_harvesting_date: '',
      base_packaging_date: '',
      base_store_location: '',
      base_remarks: '',
      show: false
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ 
      registration_ref: this.props.match.params.regId,
      regen_ref: '',
      acc_no: this.props.match.params.acc,
      active_seed_wt: '',
      active_germination_rate: '',
      active_planting_date: '',
      active_harvesting_date: '',
      active_packaging_date: '',
      active_store_location: '',
      active_remarks: '',
      base_seed_wt: '',
      base_germination_rate: '',
      base_planting_date: '',
      base_harvesting_date: '',
      base_packaging_date: '',
      base_store_location: '',
      base_remarks: '',
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
    const registration_ref = this.state.registration_ref;
    const regen_ref = this.state.regen_ref;
    const acc_no = this.state.acc_no;
    const active_seed_wt = this.state.active_seed_wt;
    const active_germination_rate = this.state.active_germination_rate;
    const active_planting_date = this.state.active_planting_date;
    const active_harvesting_date = this.state.active_harvesting_date;
    const active_packaging_date = this.state.active_packaging_date;    
    const active_store_location = this.state.active_store_location;
    const active_remarks = this.state.active_remarks;
    const base_seed_wt = this.state.base_seed_wt;
    const base_germination_rate = this.state.base_germination_rate;
    const base_planting_date = this.state.base_planting_date;
    const base_harvesting_date = this.state.base_harvesting_date;
    const base_packaging_date = this.state.base_packaging_date;    
    const base_store_location = this.state.base_store_location;
    const base_remarks = this.state.base_remarks;

    const data = {
      registration_ref,
      regen_ref,
      acc_no,
      active_seed_wt,
      active_germination_rate,
      active_planting_date,
      active_harvesting_date,
      active_packaging_date,
      active_store_location,
      active_remarks,
      base_seed_wt,
      base_germination_rate,
      base_planting_date,
      base_harvesting_date,
      base_packaging_date,
      base_store_location,
      base_remarks
    };    
    event.preventDefault();
    base.addToCollection('inventory', data)
      .then(() => {
        //document is added to the collection
      }).catch(err => {
      //handle error
    });
  }

  render() {        
    console.log(this.props);
    return (
      <div className="container">
        <h2>Create Inventory Data</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">      
            <label>
              REGEN REF
              <input type="text" className="form-control" placeholder="Regen Ref" value={this.state.regen_ref} name="regen_ref" onChange={this.handleChange} />
            </label>          
          </div>                
          <div className="form-group">      
            <label>
              ACC NO
              <input type="text" disabled className="form-control" placeholder="Acc no" value={this.state.acc_no} name="acc_no" onChange={this.handleChange} />
            </label>          
          </div>
          <h3> ACTIVE </h3>
          <div className="form-group">      
            <label>
              TOTAL SEED WT
              <input type="text" className="form-control" placeholder="Total Seed Wt" value={this.state.active_seed_wt} name="active_seed_wt" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              % GERMINATION
              <input type="text" className="form-control" placeholder="% Germination" value={this.state.active_germination_rate} name="active_germination_ratei" onChange={this.handleChange} />
            </label>          
          </div>         
          <div className="form-group">      
            <label>
              PLANTING DATE
              <input type="text" className="form-control" placeholder="Planting Date" value={this.state.active_planting_date} name="active_planting_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              HARVESTING DATE
              <input type="text" className="form-control" placeholder="Harvesting Date" value={this.state.active_harvesting_date} name="active_harvesting_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              PACKAGING DATE
              <input type="text" className="form-control" placeholder="Packaging Date" value={this.state.active_packaging_date} name="active_packaging_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              STORE LOCATION
              <input type="text" className="form-control" placeholder="Store Location" value={this.state.active_store_location} name="active_store_location" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              REMARKS
              <input type="text" className="form-control" placeholder="Remarks" value={this.state.active_remarks} name="active_remarks" onChange={this.handleChange} />
            </label>          
          </div>
          <h3>BASE</h3>
          <div className="form-group">      
            <label>
              TOTAL SEED WT
              <input type="text" className="form-control" placeholder="Total Seed Wt" value={this.state.base_seed_wt} name="base_seed_wt" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              % GERMINATION
              <input type="text" className="form-control" placeholder="% Germination" value={this.state.base_germination_rate} name="base_germination_ratei" onChange={this.handleChange} />
            </label>          
          </div>         
          <div className="form-group">      
            <label>
              PLANTING DATE
              <input type="text" className="form-control" placeholder="Planting Date" value={this.state.base_planting_date} name="base_planting_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              HARVESTING DATE
              <input type="text" className="form-control" placeholder="Harvesting Date" value={this.state.base_harvesting_date} name="base_harvesting_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              PACKAGING DATE
              <input type="text" className="form-control" placeholder="Packaging Date" value={this.state.base_packaging_date} name="base_packaging_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              STORE LOCATION
              <input type="text" className="form-control" placeholder="Store Location" value={this.state.base_store_location} name="base_store_location" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              REMARKS
              <input type="text" className="form-control" placeholder="Remarks" value={this.state.base_remarks} name="base_remarks" onChange={this.handleChange} />
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
 
export default CreateInventory;