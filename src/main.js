import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/home";
import Stuff from "./components/stuff";
import Contact from "./components/contact";
import CreateRegistration from "./components/registration/create";
import UpdateRegistration from "./components/registration/update";

class Main extends Component {
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
                  <NavLink to="/stuff">Stuff</NavLink>
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
            </header> 

            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/stuff" component={Stuff}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/registration/create" component={CreateRegistration}/>
              <Route path="/registration/update/:regId" component={UpdateRegistration}/>
            </div>        
          </main>    
          

        </div>

      </HashRouter>
    );
  }
}
 
export default Main;