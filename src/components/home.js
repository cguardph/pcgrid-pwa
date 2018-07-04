import React, { Component } from "react";

import Loader from "./loader";

// import base from '../rebase';
 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    };
  }

  componentDidMount() {
    /*this.ref = base.bindCollection('registration', {
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
          <h2>Home</h2>                         

          {this.state.loading === true ? (
            <Loader /> 
          ) : (
            <p>Home</p>
          )}              
        </div>
      </div>
    );
  }
}
 
export default Home;