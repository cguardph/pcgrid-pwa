import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";

import Loader from "../loader";
 
class ViewRegistration extends Component {
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

  render() {    
    return (
      <div className="container">
        <h2>View Registration Data</h2>

        {this.state.loading === true ? (
            <Loader /> 
          ) : (
            <div>
              <p>PHL NO: {this.state.phl}</p>
              <p>NPGRL CEREALS No: {this.state.npgrl_cereals_no}</p>              
              <p>GB No: {this.state.gb_no}</p>
              <p>OLD ACC NO: {this.state.acc}</p>
              <p>APN: {this.state.apn}</p>
              <p>Other No: {this.state.other_no}</p>
              <p>LOCAL NAME: {this.state.local_name}</p>
              <p>PHL REGION: {this.state.region}</p>
              <p>DATE RECEIVED: {this.state.date_received}</p>
              <p>CROP: {this.state.crop}</p>
              <p>GENUS: {this.state.genus}</p>
              <p>SPECIES: {this.state.species}</p>
              <p>TOTAL ACTIVE WT: {this.state.total_active_wt}</p>
              <p>TOTAL BASE WT: {this.state.total_base_wt}</p>
              <p>CONSERVATION STATUS: {this.state.conservation_stat}</p>
              
              <NavLink to = {{
                pathname: '/registration/update',
                state: {
                  id: this.state.regId,
                }
              }}>
                <Button bsStyle="info" bsSize="small">Update</Button>&nbsp;&nbsp;            
              </NavLink>      
            </div>
          )}         
      </div>
    );
  }
}
 
export default ViewRegistration;