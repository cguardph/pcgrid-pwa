import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";
 
class UpdateRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cguard_region: '',
      cguard_n: '',
      cguard_npgrl: '',
      gb_no: '',
      apn: '',
      local_name: '',
      region: 'Region I',
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
    console.log('registration/'+this.state.regId);
    const cguard_region = this.state.cguard_region;
    const cguard_n = this.state.cguard_n;
    const cguard_npgrl = this.state.cguard_npgrl;
    const gb_no = this.state.gb_no;
    const apn = this.state.apn;
    const local_name = this.state.local_name;
    const region = this.state.region;

    const data = {
      cguard_region,
      cguard_n,
      cguard_npgrl,
      gb_no,
      apn,
      local_name,
      region
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
            <div className="loader">
              <svg viewBox="0 0 32 32" width="64" height="64">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
              </svg>
            </div> 
          ) : (
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">      
                  <label>
                    CGUARD Region
                    <input type="text" className="form-control" placeholder="CGUARDI - XXXX" value={this.state.cguard_region} name="cguard_region" onChange={this.handleChange} />
                  </label>          
                </div>
                <div className="form-group">      
                  <label>
                    CGUARD N
                    <input type="text" className="form-control" placeholder="CGUARDN" value={this.state.cguard_n} name="cguard_n" onChange={this.handleChange} />
                  </label>          
                </div>
                <div className="form-group">      
                  <label>
                    CGUARD NPGRL
                    <input type="text" className="form-control" placeholder="CGUARD NPGRL" value={this.state.cguard_npgrl} name="cguard_npgrl" onChange={this.handleChange} />
                  </label>          
                </div>
                <div className="form-group">      
                  <label>
                    GB No
                    <input type="text" className="form-control" placeholder="GB No" value={this.state.gb_no} name="gb_no" onChange={this.handleChange} />
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
                    Local Name
                    <input type="text" className="form-control" placeholder="Local Name" value={this.state.local_name} name="local_name" onChange={this.handleChange} />
                  </label>          
                </div>
                <div className="form-group">      
                  <label>
                    Region
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
                  <Button type="submit" value="Submit" bsStyle="success" onClick={this.handleShow}>Submit</Button>  
                </div>
              </form>  
              <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header>
                  <Modal.Title>Successfully updated registration data</Modal.Title>
                </Modal.Header>                
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Update again</Button>
                  <NavLink to="/">
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