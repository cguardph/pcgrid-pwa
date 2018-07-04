import React, { Component } from "react";
import { auth, googleAuthProvider } from '../rebase';
import GoogleButton from 'react-google-button'

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
    console.log(this.state.user) 
    return (
      <div className="container">
        <GoogleButton
          type="light"
          onClick={( ) => auth.signInWithPopup(googleAuthProvider)}
        />              
      </div>
    );
  }
}
 
export default Login;