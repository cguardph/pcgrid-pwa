import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import base from "../../rebase";

import Loader from "../loader"; 

class UpdateInventory extends Component {
  constructor(props) {
    super(props);
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
      invId: this.props.match.params.invId,

      reg: '',
      prev_active_seed_wt: '',
    };        

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.ref = base.bindDoc('inventory/'+this.state.invId, {
      context: this,      
      withRefs: true,
      withIds: true,
      then() {        
        this.setState({ 
          loading: false,
          prev_active_seed_wt : this.state.active_seed_wt,
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
    base.updateDoc('inventory/'+this.state.invId, data)
      .then(() => {
        //document is added to the collection
      }).catch(err => {
      //handle error
    });

    base.get('registration/'+this.state.registration_ref, {
      context: this,
    }).then(data => {
      this.setState({reg: data.total_active_wt})

      base.updateDoc('registration/'+this.state.registration_ref, { total_active_wt : parseFloat(this.state.reg) + (parseFloat(this.state.active_seed_wt) - parseFloat(this.state.prev_active_seed_wt))
      }).then(() => {
          //document is updated          
      }).catch(err => {
          //handle error
      });     

      this.setState({
        reg : parseFloat(this.state.reg) + (parseFloat(this.state.active_seed_wt) - parseFloat(this.state.prev_active_seed_wt)),
        prev_active_seed_wt : this.state.active_seed_wt
      });
    });    
    

    
  }

  render() {
    console.log(this.state);
    
    return (
      <div className="container">
        <h2>Update Inventory Data</h2>

        {this.state.loading === true ? (
            <Loader />
          ) : (
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>REGEN REF</label>          
                  <input type="text" className="form-control" placeholder="Regen Ref" value={this.state.regen_ref} name="regen_ref" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">                        
                  <label style={{ marginRight: '10px' }}>PHL NO</label>          
                  <input type="text" className="form-control" placeholder="Acc no" value={this.state.acc_no} name="acc_no" onChange={this.handleChange} />                  
                </div>       
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>PLANTING DATE</label>          
                  <input type="text" className="form-control" placeholder="Planting Date" value={this.state.planting_date} name="planting_date" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>HARVESTING DATE</label>          
                  <input type="text" className="form-control" placeholder="Harvesting Date" value={this.state.harvesting_date} name="harvesting_date" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>PACKAGING DATE</label>          
                  <input type="text" className="form-control" placeholder="Local Name" value={this.state.packaging_date} name="packaging_date" onChange={this.handleChange} />
                </div>      
                <h3>ACTIVE</h3>         
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>TOTAL SEED WT</label>          
                  <input type="text" className="form-control" placeholder="Total Seed Wt" value={this.state.active_seed_wt} name="active_seed_wt" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>% GERMINATION</label>          
                  <input type="text" className="form-control" placeholder="% Germination" value={this.state.active_germination_rate} name="active_germination_rate" onChange={this.handleChange} />
                </div>                         
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>STORE LOCATION</label>          
                  <input type="text" className="form-control" placeholder="Store Location" value={this.state.active_store_location} name="active_store_location" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>REMARKS</label>          
                  <input type="text" className="form-control" placeholder="Local Name" value={this.state.active_remarks} name="active_remarks" onChange={this.handleChange} />
                </div>         
                <h3>BASE</h3>         
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>TOTAL SEED WT</label>          
                  <input type="text" className="form-control" placeholder="Total Seed Wt" value={this.state.base_seed_wt} name="base_seed_wt" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>% GERMINATION</label>          
                  <input type="text" className="form-control" placeholder="% Germination" value={this.state.base_germination_rate} name="base_germination_rate" onChange={this.handleChange} />
                </div>         
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>STORE LOCATION</label>          
                  <input type="text" className="form-control" placeholder="Store Location" value={this.state.base_store_location} name="base_store_location" onChange={this.handleChange} />
                </div>
                <div className="form-group form-inline">      
                  <label style={{ marginRight: '10px' }}>REMARKS</label>          
                  <input type="text" className="form-control" placeholder="Local Name" value={this.state.base_remarks} name="base_remarks" onChange={this.handleChange} />
                </div>               
                <div className="form-group form-inline">      
                  <Button type="submit" value="Submit" bsStyle="success" onClick={this.handleShow}>Update</Button>  
                  <NavLink to ={"/inventory/view/"+this.state.invId}>
                    <Button onClick={this.handleClose}>Back to view</Button>
                  </NavLink>
                </div>
              </form>  
              <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header>
                  <Modal.Title>Successfully updated inventory data</Modal.Title>
                </Modal.Header>                
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Update again</Button>
                  <NavLink to="/inventory/list">
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
 
export default UpdateInventory;