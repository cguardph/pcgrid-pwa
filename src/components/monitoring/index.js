import React, { Component } from "react";
import MonitoringList from "./list";

import base from '../../rebase';

import Loader from "../loader";
 
class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    };
  }

  componentDidMount() {
    this.ref = base.bindCollection('regeneration', {
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
          <h2>Monitoring</h2>                         

          {this.state.loading === true ? (
            <Loader />
          ) : (
            <MonitoringList
              items={this.state.list}              
            />
          )}              
        </div>
      </div>
    );
  }
}
 
export default Monitoring;