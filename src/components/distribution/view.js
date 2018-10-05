import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";

import Loader from "../loader";
 
class ViewDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      germ_req_no: '',
      regen_ref: '',      
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

      loading: true,
      show: false,
      distId: this.props.location.state.id
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.ref = base.bindDoc('distribution/'+this.state.distId, {
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

  render() {    
    return (
      <div className="container">
        <h2>View Distribution Data</h2>

        {this.state.loading === true ? (
            <Loader /> 
          ) : (
            <div>
              <p>GERMPLASM REQUEST NO: {this.state.germ_req_no}</p>
              <p>REGEN REF: {this.state.regen_ref}</p> 
              <p>RECIPIENT NAME: {this.state.recipient_name}</p>
              <p>RECIPIENT ADDRESS: {this.state.recipient_address}</p>
              <p>AMOUNT DISPATCHED: {this.state.amount_dispatched}</p>                      
              <p>PURPOSE: {this.state.purpose}</p>
              <p>DATE REQUESTED: {this.state.date_requested}</p>              
              <p>DATE DISPATCHED: {this.state.date_dispatched}</p>
              <p>INSTITUTION: {this.state.institution}</p>              
              <p>CONTACT NO: {this.state.contact_number}</p>
              <p>EMAIL: {this.state.email}</p>              
              <p>MODE: {this.state.mode}</p>
              <p>MTA MATTERS: {this.state.mta_matters}</p>
              <p>REMARKS: {this.state.remarks}</p>
              
              <NavLink to= {{
                pathname: '/distribution/update',
                state: {
                  id: this.state.distId,
                }
              }} >
                <Button bsStyle="info" bsSize="small">Update</Button>&nbsp;&nbsp;                          
              </NavLink>      
            </div>
          )}         
      </div>
    );
  }
}
 
export default ViewDistribution;