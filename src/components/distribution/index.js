import React, { Component } from "react";
import DistributionList from "./list";

import base from '../../rebase';

import Loader from "../loader";
 
class Distribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false
    };
  }

  componentDidMount() {
   /* this.ref = base.bindCollection('distribution', {
      context: this,
      state: 'list',
      withRefs: true,
      withIds: true,
      then() {
        this.setState({ loading: false });
      }
    });*/
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">         
          <h2>Distribution</h2>                         

          {this.state.loading === true ? (
            <Loader />
          ) : (
            <DistributionList
              items={this.state.list}              
            />
          )}              
        </div>
      </div>
    );
  }
}
 
export default Distribution;