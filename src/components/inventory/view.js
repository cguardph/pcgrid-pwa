import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";

import Loader from "../loader";
 
class ViewInventory extends Component {
  constructor(props) {
    super(props);    
    console.log(props)
    this.state = {
      regen_ref: '',
      acc_no: '',
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

      loading: true,
      show: false,
      invId: this.props.location.state.id
    };    

    this.handleChange = this.handleChange.bind(this);    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {    
    this.ref = base.bindDoc('inventory/'+this.state.invId, {
      context: this,      
      withRefs: true,
      withIds: true,
      then() {                
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount(){    
    this.props.history.push(this.state)
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
        <h2>View Inventory Data</h2>

        {this.state.loading === true ? (
            <Loader /> 
          ) : (
            <div>
              <p>REGEN REF: {this.state.regen_ref}</p>
              <p>PHL NO: {this.state.acc_no}</p> 
              <p>PLANTING DATE: {this.state.active_planting_date}</p>
              <p>HARVESTING DATE: {this.state.active_harvesting_date}</p>
              <p>PACKAGING DATE: {this.state.active_packaging_date}</p>
              <h3>ACTIVE</h3>             
              <p>TOTAL SEED WT: {this.state.active_seed_wt}</p>
              <p>% GERMINATION: {this.state.active_germination_rate}</p>              
              <p>STORE LOCATION: {this.state.active_store_location}</p>
              <p>REMARKS: {this.state.active_remarks}</p>
              <h3>BASE</h3>
              <p>TOTAL SEED WT: {this.state.base_seed_wt}</p>
              <p>% GERMINATION: {this.state.base_germination_rate}</p>              
              <p>STORE LOCATION: {this.state.base_store_location}</p>
              <p>REMARKS: {this.state.base_remarks}</p>
              
              <NavLink to= {{
                pathname: '/inventory/update',
                state: {
                  id: this.state.invId,
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
 
export default ViewInventory;