import React, { Component } from 'react';
import WelcomeComponent from './pages/welcome';
import Home from './pages/home';
import SignIn from './auth/signIn';
import SignUp from './auth/signUp';
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
 
export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <WelcomeComponent />
        <Router>
         <div>
           <Switch>
             <Route exact path = "/" component={Home} />
             <Route path = "/signin" component={SignIn} />
             <Route path = "/signup" component={SignUp} />
           </Switch>
         </div>
       </Router>

      </div>
    );
  }
}
