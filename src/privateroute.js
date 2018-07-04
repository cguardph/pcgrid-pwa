import React, { Component } from "react";
import { auth } from './rebase';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  constructor(props) {
    super(props);
    this.state = {
      user: "",   
    };
  }
  // Add your own authentication on the below line.
  // const isLoggedIn = auth.isLoggedIn()
  //componentDidMount ( ) {
  
  //}
  return (
    <Route
      {...rest}
      render={props =>
        this.state.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute