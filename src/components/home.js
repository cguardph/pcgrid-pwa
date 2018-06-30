import React, { Component } from "react";
import List from "./list";

import base from '../rebase';
 
class Home extends Component {
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
  
  handleRemoveItem(ref) {
    base.removeDoc(ref);
  }

  render() {
    return (
      <div className="container">
        <div className="row">         
          <h2>Registration</h2>                         

          {this.state.loading === true ? (
            <div className="loader">
            <svg viewBox="0 0 32 32" width="64" height="64">
              <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
            </svg>
          </div> 
          ) : (
            <List
              items={this.state.list}              
            />
          )}              
        </div>
      </div>
    );
  }
}
 
export default Home;