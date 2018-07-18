import React, { Component } from "react";
import InventoryList from "./list";

import base from '../../rebase';

import Loader from "../loader";
 
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    };
  }

  componentDidMount() {
    this.ref = base.bindCollection('inventory', {
      context: this,
      state: 'list',
      withRefs: true,
      withIds: true,
      then() {
        this.setState({ loading: false });
      }
    });
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">         
          <h2>Inventory</h2>                         

          {this.state.loading === true ? (
            <Loader />
          ) : (
            <InventoryList
              items={this.state.list}              
            />
          )}              
        </div>
      </div>
    );
  }
}
 
export default Inventory;