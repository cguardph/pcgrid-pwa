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
      cguard_region: '',
      gb_no: '',
      phl: '',
      acc: '',
      apn: '',
      other_no: '',
      local_name: '',
      region: 'Region I',
      crop: 'Corn',
      loading: true,
      show: false,
      regId: this.props.match.params.regId
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
    const cguard_region = this.state.cguard_region;    
    const gb_no = this.state.gb_no;
    const phl = this.state.phl;
    const acc = this.state.acc;
    const other_no = this.state.other_no;
    const apn = this.state.apn;
    const local_name = this.state.local_name;
    const region = this.state.region;
    const crop = this.state.crop;

    const data = {
      npgrl_cereals_no,
      cguard_region,      
      gb_no,
      phl,
      acc,
      other_no,
      apn,
      local_name,
      region,
      crop
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
        <h2>View Registration Data</h2>

        {this.state.loading === true ? (
            <Loader /> 
          ) : (
            <div>
              <p>NPGRL CEREALS No: {this.state.npgrl_cereals_no}</p>
              <p>CGUARD Region: {this.state.cguard_region}</p>
              <p>GB No: {this.state.gb_no}</p>
              <p>PHL: {this.state.phl}</p>
              <p>ACC: {this.state.acc}</p>
              <p>APN: {this.state.apn}</p>
              <p>Other No: {this.state.other_no}</p>
              <p>Local Name: {this.state.local_name}</p>
              <p>Region: {this.state.region}</p>
              <p>Crop: {this.state.crop}</p>

              <NavLink to ={"/registration/update/"+this.state.regId}>
                <Button bsStyle="info" bsSize="small">Update</Button>&nbsp;&nbsp;            
              </NavLink>      
            </div>
          )}         
      </div>
    );
  }
}
 
export default ViewRegistration;