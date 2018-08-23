import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";
 
class CreateMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory_ref: this.props.match.params.invId,
      regen_ref: this.props.match.params.regRef,
      
      show: false
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ 
      inventory_ref: this.props.match.params.invId,
      regen_ref: this.props.match.params.regRef,
     
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

    const data = {
      inventory_ref,
      regen_ref,      
    };    
    event.preventDefault();
    base.addToCollection('regeneration', data)
      .then(() => {
        //document is added to the collection
      }).catch(err => {
      //handle error
    });
  }

  render() {        
    return (
      <div className="container">
        <h2>Create Monitoring Data</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">      
            <label>
              REGEN REF
              <input type="text" disabled className="form-control" placeholder="Regen Ref" value={this.state.regen_ref} name="regen_ref" onChange={this.handleChange} />
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
              Successfully created withdrawal for regeneration.
            </p>
          </Modal.Body>
          <Modal.Footer>            
            <NavLink to="/inventory/list">
              <Button onClick={this.handleClose}>Back to Inventory</Button>
            </NavLink>
            <NavLink to="/regeneration/list">
              <Button onClick={this.handleClose}>Go to Monitoring</Button>
            </NavLink>
          </Modal.Footer>
        </Modal>      
      </div>
    );
  }
}
 
export default CreateMonitoring;