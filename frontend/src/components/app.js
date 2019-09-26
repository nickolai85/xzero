import React, { Component } from 'react';
import WelcomeComponent from './pages/welcome';
import axios from "axios";
import Home from './pages/home';
import SignIn from './auth/signIn';
import SignUp from './auth/signUp';
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      userdata:""
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
  }
  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }
  checkLoginStatus() {
    
    let token = localStorage.getItem('token');
    let data = {headers: {
        Accept:'application/json',
        Authorization:`Bearer ${token}`
        }};
    return axios
      .get("http://localhost:10077/api/user",data)
      .then(response => {
        const loggedIn = response.data.loggedIn;
        console.log(response);
        const loggedInStatus = this.state.loggedInStatus;
        console.log('loggedIn',loggedIn);
        console.log('loggedInStatus', loggedInStatus)
        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          console.log('cond1');
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          console.log('cond2');
          this.setState({
            loggedInStatus: "LOGGED_IN",
            userdata: response.data
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          console.log('cond3');
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            userdata:''
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }
  componentDidMount() {
    this.checkLoginStatus();
  }
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
