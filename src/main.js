import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter,
  Redirect
} from "react-router-dom";
import { auth, googleAuthProvider } from './rebase';
import GoogleButton from 'react-google-button';
import Home from "./components/home";
import Contact from "./components/contact";
import Registration from "./components/registration/index";
import CreateRegistration from "./components/registration/create";
import ViewRegistration from "./components/registration/view";
import UpdateRegistration from "./components/registration/update";
import Passport from "./components/passport/index";

class Main extends Component {
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
      <HashRouter>
        <div>
          <nav id="menu" className="menu">
            <section className="menu-section">              
              <h3 className="menu-section-title">PCGRID Menu</h3>
              <ul className="menu-section-list" styles="{{ list-style: none; }}">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                 <li>
                  <NavLink to="/registration/list">Registration</NavLink>
                </li>
                <li>
                  <NavLink to="/passport/list">Passport</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </section>  
          </nav>

          <main id="panel" className="panel">
            <header className="header">        
              <button className="toggle-button">
                ☰
              </button>                  
              <h1 className="header__title"><NavLink className="header-text" to="/">PCGRID</NavLink></h1>                   
              { this.state.user ? (
                <NavLink to="/" onClick={( ) => auth.signOut()}>Logout</NavLink>
                ) : (
                <NavLink to="/" onClick={( ) => auth.signInWithPopup(googleAuthProvider)}>Login</NavLink>
              )}              
            </header> 

            <div className="content">              
              <Route exact path="/" component={Home}/>              
              <Route path="/contact" component={Contact}/>
              <Route path="/registration/list" component={Registration}/>
              <Route path="/registration/create" component={CreateRegistration}/>
              <Route path="/registration/view/:regId" component={ViewRegistration}/>              
              <Route path="/registration/update/:regId" component={UpdateRegistration}/>
              <Route path="/passport/list" component={Passport}/>
              
            </div>        
          </main>    
          

        </div>

      </HashRouter>
    );
  }
}
 
export default Main;