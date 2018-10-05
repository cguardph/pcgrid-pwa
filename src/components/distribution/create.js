import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";
 
class CreateDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory_ref: this.props.location.state.inv_id,
      regen_ref: this.props.location.state.regen_ref,
      registration_ref: this.props.location.state.registration_ref,
      germ_req_no: '',
      recipient_name: '',
      recipient_address: '',
      amount_dispatched: '',
      purpose: '',
      date_requested: '',
      date_dispatched: '',
      institution: '',
      contact_number: '',
      email: '',
      mode: '',
      mta_matters: '',
      remarks: '',
      
      reg_total_active_wt: '',
      inv_active_seed_wt: '',
      registration: '',

      show: false
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ 
      inventory_ref: this.props.location.state.inv_id,
      regen_ref: this.props.location.state.regen_ref,
      registration_ref: this.props.location.state.registration_ref,
      germ_req_no: '',
      recipient_name: '',
      recipient_address: '',
      amount_dispatched: '',
      purpose: '',
      date_requested: '',
      date_dispatched: '',
      institution: '',
      contact_number: '',
      email: '',
      mode: '',
      mta_matters: '',
      remarks: '',

      reg_total_active_wt: '',
      inv_active_seed_wt: '',
     
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
    const inventory_ref = this.state.inventory_ref;
    const regen_ref = this.state.regen_ref; 
    const registration_ref = this.state.registration_ref;
    const germ_req_no = this.state.germ_req_no;
    const recipient_name = this.state.recipient_name; 
    const recipient_address = this.state.recipient_address; 
    const amount_dispatched = this.state.amount_dispatched; 
    const purpose = this.state.purpose; 
    const date_requested = this.state.date_requested; 
    const date_dispatched = this.state.date_dispatched; 
    const institution = this.state.institution; 
    const contact_number = this.state.contact_number; 
    const email = this.state.email; 
    const mode = this.state.mode; 
    const mta_matters = this.state.mta_matters; 
    const remarks = this.state.remarks; 


    const data = {
      inventory_ref,
      regen_ref,  
      registration_ref,
      germ_req_no,
      recipient_name,
      recipient_address,
      amount_dispatched,
      purpose,
      date_requested,
      date_dispatched,
      institution,
      contact_number,
      email,
      mode,
      mta_matters,
      remarks    
    };    
    event.preventDefault();    

    base.get('registration/'+this.state.registration_ref, {
      context: this,
    }).then( data => {
      this.setState({
        reg_total_active_wt: data.total_active_wt,  
        registration : data      
      });

      base.updateDoc('registration/'+this.state.registration_ref, {
        total_active_wt : parseFloat(this.state.reg_total_active_wt) - parseFloat(this.state.amount_dispatched),
      });
    });

    base.get('inventory/'+this.state.inventory_ref, {
      context: this,
    }).then( data => {
      this.setState({
        inv_active_seed_wt: data.active_seed_wt,        
      });

      base.updateDoc('inventory/'+this.state.inventory_ref, {
        active_seed_wt : parseFloat(this.state.inv_active_seed_wt) - parseFloat(this.state.amount_dispatched),
      });
    });
       
    base.addToCollection('distribution', data)
      .then(() => {
        //document is added to the collection
      }).catch(err => {
      //handle error
    });

    this.setState({
      total_active_wt : parseFloat(this.state.reg_total_active_wt) - parseFloat(this.state.amount_dispatched),
      active_seed_wt : parseFloat(this.state.inv_active_seed_wt) - parseFloat(this.state.amount_dispatched),
    })
  }

  render() {      
    return (
      <div className="container">
        <h2>Create Distribution Data</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">      
            <label>
              GERMPLASM REQUEST NUMBER
              <input type="text" className="form-control" placeholder="Germplasm Request Number" value={this.state.germ_req_no} name="germ_req_no" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group">      
            <label>
              REGEN REF
              <input type="text" disabled className="form-control" placeholder="Regen Ref" value={this.state.regen_ref} name="regen_ref" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              RECIPIENT
              <input type="text" className="form-control" placeholder="Recipient name" value={this.state.recipient_name} name="recipient_name" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              ADDRESS
              <input type="text" className="form-control" placeholder="Recipient Address" value={this.state.recipient_address} name="recipient_address" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              AMOUNT DISPATCHED
              <input type="text" className="form-control" placeholder="Amount Dispatched" value={this.state.amount_dispatched} name="amount_dispatched" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              PURPOSE
              <input type="text" className="form-control" placeholder="Purpose" value={this.state.purpose} name="purpose" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              DATE REQUESTED
              <input type="text" className="form-control" placeholder="Date Requested" value={this.state.date_requested} name="date_requested" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              DATE DISPATCHED
              <input type="text" className="form-control" placeholder="Date Dispatched" value={this.state.date_dispatched} name="date_dispatched" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              INSTITUTION
              <input type="text" className="form-control" placeholder="Institution" value={this.state.institution} name="institution" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              CONTACT NO
              <input type="text" className="form-control" placeholder="Contact No" value={this.state.contact_number} name="contact_number" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              EMAIL
              <input type="text" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              MODE
              <input type="text" className="form-control" placeholder="Mode" value={this.state.mode} name="mode" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              MTA MATTERS
              <input type="text" className="form-control" placeholder="MTA Matters" value={this.state.mta_matters} name="mta_matters" onChange={this.handleChange} />
            </label> 
          </div>
          <div className="form-group"> 
            <label>
              REMARKS
              <input type="text" className="form-control" placeholder="Remarks" value={this.state.remarks} name="remarks" onChange={this.handleChange} />
            </label>          
          </div>            
          <div className="form-group">      
            <Button type="submit" value="Submit" bsStyle="success" onClick={this.handleShow}>Withdraw</Button>  
          </div>                      
        </form>  
        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>             
            <p>
              Successfully created withdrawal for distribution.
            </p>
          </Modal.Body>
          <Modal.Footer>            
            <NavLink to="/inventory/list">
              <Button onClick={this.handleClose}>Back to Inventory</Button>
            </NavLink>
            <NavLink to="/distribution/list">
              <Button onClick={this.handleClose}>Go to Distribution</Button>
            </NavLink>
          </Modal.Footer>
        </Modal>      
      </div>
    );
  }
}
 
export default CreateDistribution;