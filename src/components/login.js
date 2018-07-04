import React, { Component } from "react";
import { auth, googleAuthProvider } from '../rebase';
import GoogleButton from 'react-google-button'
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",      
    };
  }
  componentDidMount ( ) {
    auth.onAuthStateChanged(user => this.setState({ user }))
  }

  render() {       
    return (
      <div className="container">
        { this.state.user ? (
                <Redirect to="/" />
                ) : (                
                <GoogleButton
                  type="light"
                  onClick={( ) => auth.signInWithPopup(googleAuthProvider)}
                />   
              )}        
      </div>
    );
  }
}
 
export default Login;