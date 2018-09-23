import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";
 
class CreateInventory extends Component {
  constructor(props) {
    super(props);      
    this.state = {
      registration_ref: this.props.location.state.id,
      regen_ref: '',
      acc_no: this.props.location.state.acc,
      planting_date: '',
      harvesting_date: '',
      packaging_date: '',
      active_seed_wt: 0,
      active_germination_rate: '',
      active_store_location: '',
      active_remarks: '',
      base_seed_wt: 0,
      base_germination_rate: '',
      base_store_location: '',
      base_remarks: '',

      total_active_wt: this.props.location.state.total_active_wt,
      total_base_wt: this.props.location.state.total_base_wt,
      show: false
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ 
      registration_ref: this.props.location.state.id,
      regen_ref: '',
      acc_no: this.props.location.state.acc,
      planting_date: '',
      harvesting_date: '',
      packaging_date: '',
      active_seed_wt: '',
      active_germination_rate: '',
      active_store_location: '',
      active_remarks: '',
      base_seed_wt: '',
      base_germination_rate: '',
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
    const planting_date = this.state.planting_date;
    const harvesting_date = this.state.harvesting_date;
    const packaging_date = this.state.packaging_date;    
    const active_seed_wt = this.state.active_seed_wt;
    const active_germination_rate = this.state.active_germination_rate;
    const active_store_location = this.state.active_store_location;
    const active_remarks = this.state.active_remarks;
    const base_seed_wt = this.state.base_seed_wt;
    const base_germination_rate = this.state.base_germination_rate;
    const base_store_location = this.state.base_store_location;
    const base_remarks = this.state.base_remarks;

    const data = {
      registration_ref,
      regen_ref,
      acc_no,
      active_seed_wt,
      active_germination_rate,
      planting_date,
      harvesting_date,
      packaging_date,
      active_store_location,
      active_remarks,
      base_seed_wt,
      base_germination_rate,
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

    base.updateDoc('registration/'+this.state.registration_ref, { 
      total_active_wt: parseFloat(this.state.total_active_wt) + parseFloat(this.state.active_seed_wt),
      total_base_wt: parseFloat(this.state.total_base_wt) + parseFloat(this.state.base_seed_wt), 
    }).then(() => {
      
    }).catch(err => {
      //handle error
    });
    this.state.total_active_wt = parseFloat(this.state.total_active_wt) + parseFloat(this.state.active_seed_wt);
    this.state.total_base_wt = parseFloat(this.state.total_base_wt) + parseFloat(this.state.base_seed_wt);
  }

  render() {        
    return (
      <div className="container">
        <h2>Create Inventory</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">      
            <label>
              REGEN REF
              <input type="text" className="form-control" placeholder="Regen Ref" value={this.state.regen_ref} name="regen_ref" onChange={this.handleChange} />
            </label>          
          </div>                
          <div className="form-group">      
            <label>
              PHL NO
              <input type="text" disabled className="form-control" placeholder="Acc no" value={this.state.acc_no} name="acc_no" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              PLANTING DATE
              <input type="text" className="form-control" placeholder="Planting Date" value={this.state.planting_date} name="planting_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              HARVESTING DATE
              <input type="text" className="form-control" placeholder="Harvesting Date" value={this.state.harvesting_date} name="harvesting_date" onChange={this.handleChange} />
            </label>          
          </div>
          <div className="form-group">      
            <label>
              PACKAGING DATE
              <input type="text" className="form-control" placeholder="Packaging Date" value={this.state.packaging_date} name="packaging_date" onChange={this.handleChange} />
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
              <input type="text" className="form-control" placeholder="% Germination" value={this.state.active_germination_rate} name="active_germination_rate" onChange={this.handleChange} />
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
              <input type="text" className="form-control" placeholder="% Germination" value={this.state.base_germination_rate} name="base_germination_rate" onChange={this.handleChange} />
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
              <Button onClick={this.handleClose}>Back to Registration</Button>
            </NavLink>
            <NavLink to="/inventory/list">
              <Button onClick={this.handleClose}>Go to Inventory</Button>
            </NavLink>
          </Modal.Footer>
        </Modal>      
      </div>
    );
  }
}
 
export default CreateInventory;