import React, { Component } from "react";
import RegistrationList from "./list";

import base from '../../rebase';

import Loader from "../loader";
 
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    };
  }

  componentDidMount() {
    this.ref = base.bindCollection('registration', {
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
      <div className="table">
        <div className="row">         
          <h2>Registration</h2>                         

          {this.state.loading === true ? (
            <Loader />
          ) : (
            <RegistrationList
              items={this.state.list}              
            />
          )}              
        </div>
      </div>
    );
  }
}
 
export default Registration;