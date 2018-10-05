import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";

import Loader from "../loader"; 

class UpdateDistribution extends Component {
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
      distId: this.props.location.state.id,

      reg_total_active_wt: '',
      inv_active_seed_wt: '',
      prev_amount_dispatched: '',
    };        

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.ref = base.bindDoc('distribution/'+this.state.distId, {
      context: this,      
      withRefs: true,
      withIds: true,
      then() {        
        this.setState({ 
          loading: false,
          prev_amount_dispatched : this.state.amount_dispatched,          
        });
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
    const germ_req_no = this.state.germ_req_no;
    const regen_ref = this.state.regen_ref;
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
      germ_req_no,
      regen_ref,      
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
      remarks,  
    };    
    event.preventDefault();
    base.updateDoc('distribution/'+this.state.distId, data)
      .then(() => {
        //document is added to the collection
      }).catch(err => {
      //handle error
    });

    base.get('registration/'+this.state.registration_ref, {
      context: this,
    }).then(data => {
      this.setState({
        reg_total_active_wt: data.total_active_wt,        
      })

      base.updateDoc('registration/'+this.state.registration_ref, { 
        total_active_wt : parseFloat(this.state.reg_total_active_wt) - (parseFloat(this.state.amount_dispatched) - parseFloat(this.state.prev_amount_dispatched)),        
      }).then(() => {
          //document is updated          
      }).catch(err => {
          //handle error
      });     

      this.setState({
        reg_total_active_wt : parseFloat(this.state.reg_total_active_wt) - (parseFloat(this.state.amount_dispatched) - parseFloat(this.state.prev_amount_dispatched)),        
        // prev_amount_dispatched : this.state.amount_dispatched,       
      });
      base.get('inventory/'+this.state.inventory_ref, {
        context: this,
      }).then(data => {
        this.setState({
          inv_active_seed_wt: data.active_seed_wt,        
        })

        base.updateDoc('inventory/'+this.state.inventory_ref, { 
          active_seed_wt : parseFloat(this.state.inv_active_seed_wt) - (parseFloat(this.state.amount_dispatched) - parseFloat(this.state.prev_amount_dispatched)),        
        }).then(() => {
            //document is updated          
        }).catch(err => {
            //handle error
        });     

        this.setState({
          inv_active_seed_wt : parseFloat(this.state.inv_active_seed_wt) - (parseFloat(this.state.amount_dispatched) - parseFloat(this.state.prev_amount_dispatched)),        
          prev_amount_dispatched : this.state.amount_dispatched,       
        });
      }); 
    });  

          
  }

  render() {       
    return (
      <div className="container">
        <h2>Update Distribution Data</h2>

        {this.state.loading === true ? (
            <Loader />
          ) : (
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>GERMPLASM REQUEST NO</label>          
                  <input type="text" className="form-control" placeholder="Germplasm Request No" value={this.state.germ_req_no} name="germ_req_no" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">                        
                  <label style={{ marginRight: '10px' }}>REGEN REF</label>          
                  <input type="text" className="form-control" placeholder="Regen REf" value={this.state.regen_ref} name="regen_ref" onChange={this.handleChange} />                  
                </div>       
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>RECIPIENT NAME</label>          
                  <input type="text" className="form-control" placeholder="Recipient Name" value={this.state.recipient_name} name="recipient_name" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>RECIPIENT ADDRESS</label>          
                  <input type="text" className="form-control" placeholder="Recipient Address" value={this.state.recipient_address} name="recipient_address" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>AMOUNT DISPATCHED</label>          
                  <input type="text" className="form-control" placeholder="Amount Dispatched" value={this.state.amount_dispatched} name="amount_dispatched" onChange={this.handleChange} />
                </div>                          
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>PURPOSE</label>          
                  <input type="text" className="form-control" placeholder="Purpose" value={this.state.purpose} name="purpose" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>DATE REQUESTED</label>          
                  <input type="text" className="form-control" placeholder="Date Requested" value={this.state.date_requested} name="date_requested" onChange={this.handleChange} />
                </div>                         
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>DATE DISPATCHED</label>          
                  <input type="text" className="form-control" placeholder="Date Dispatched" value={this.state.date_dispatched} name="date_dispatched" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>INSTITUTION</label>          
                  <input type="text" className="form-control" placeholder="Institution" value={this.state.institution} name="institution" onChange={this.handleChange} />
                </div>                 
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>CONTACT NO</label>          
                  <input type="text" className="form-control" placeholder="Contact No" value={this.state.contact_number} name="contact_number" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>EMAIL</label>          
                  <input type="text" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                </div>         
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>MODE</label>          
                  <input type="text" className="form-control" placeholder="Mode" value={this.state.mode} name="mode" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>MTA MATTERS</label>          
                  <input type="text" className="form-control" placeholder="MTA Matters" value={this.state.mta_matters} name="mta_matters" onChange={this.handleChange} />
                </div>    
                 <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>REMARKS</label>          
                  <input type="text" className="form-control" placeholder="Remarks" value={this.state.remarks} name="remarks" onChange={this.handleChange} />
                </div>              
                <div className="form-group form-inline">      
                  <Button type="submit" value="Submit" bsStyle="success" onClick={this.handleShow}>Update</Button>  
                  <NavLink to= {{
                    pathname: '/distribution/view/',
                    state: {
                      id: this.props.location.state.id,
                    }
                  }} >
                    <Button onClick={this.handleClose}>Back to view</Button>
                  </NavLink>
                </div>
              </form>  
              <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header>
                  <Modal.Title>Successfully updated distribution data</Modal.Title>
                </Modal.Header>                
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Update again</Button>
                  <NavLink to="/distribution/list">
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
 
export default UpdateDistribution;