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
import Login from "./components/login";
import Contact from "./components/contact";
import Registration from "./components/registration/index";
import CreateRegistration from "./components/registration/create";
import ViewRegistration from "./components/registration/view";
import UpdateRegistration from "./components/registration/update";
import Inventory from "./components/inventory/index";
import CreateInventory from "./components/inventory/create";
import ViewInventory from "./components/inventory/view";
import UpdateInventory from "./components/inventory/update";
import Monitoring from "./components/monitoring/index";
import CreateMonitoring from "./components/monitoring/create";
import Distribution from "./components/distribution/index";
import CreateDistribution from "./components/distribution/create";
import ViewDistribution from "./components/distribution/view";
import UpdateDistribution from "./components/distribution/update";
import Passport from "./components/passport/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (    
      rest.user
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

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
                  <NavLink to="/inventory/list">Inventory</NavLink>
                </li>
                <li>
                  <NavLink to="/monitoring/list">Monitoring</NavLink>
                </li>
                <li>
                  <NavLink to="/distribution/list">Distribution</NavLink>
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
                <NavLink className="header-text" to="/" onClick={( ) => auth.signOut()}>Logout</NavLink>
                ) : (                
                <NavLink className="header-text" to="/login">Login</NavLink>
              )}              
            </header> 

            <div className="content">              
              <Route exact path="/" component={Home}/>          
              <Route path="/login" component={Login} />    
              <Route path="/contact" component={Contact}/>
              <PrivateRoute user={this.state.user} path="/registration/list" component={Registration}/>
              <PrivateRoute user={this.state.user} path="/registration/create" component={CreateRegistration}/>
              <PrivateRoute user={this.state.user} path="/registration/view/" component={ViewRegistration}/>              
              <PrivateRoute user={this.state.user} path="/registration/update/" component={UpdateRegistration}/>
              <PrivateRoute user={this.state.user} path="/inventory/list" component={Inventory}/>
              <PrivateRoute user={this.state.user} path="/inventory/create" component={CreateInventory}/>
              <PrivateRoute user={this.state.user} path="/inventory/view/" component={ViewInventory}/>              
              <PrivateRoute user={this.state.user} path="/inventory/update/" component={UpdateInventory}/>              
              <PrivateRoute user={this.state.user} path="/monitoring/list" component={Monitoring}/>
              <PrivateRoute user={this.state.user} path="/monitoring/create/" component={CreateMonitoring}/>
              <PrivateRoute user={this.state.user} path="/distribution/list" component={Distribution}/>
              <PrivateRoute user={this.state.user} path="/distribution/create/" component={CreateDistribution}/>
              <PrivateRoute user={this.state.user} path="/distribution/view/" component={ViewDistribution}/>
              <PrivateRoute user={this.state.user} path="/distribution/update/" component={UpdateDistribution}/>
              <PrivateRoute user={this.state.user} path="/passport/list" component={Passport}/>
              
            </div>        
          </main>    
        </div>

      </HashRouter>
    );
  }
}
 
export default Main;