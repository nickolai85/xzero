import React, { Component } from 'react';
import Auth from './pages/auth';
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
      loggedInStatus: false,
      back_response: false,
      userdata:""
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
  }
   checkLoginStatus(token) {
    let data = {headers: {
        Accept:'application/json',
        Authorization:`Bearer ${token}`
        }};
    return axios
      .get("http://localhost:10077/api/user",data)
      .then(response => {

        if(response.data.logged_in === "LOGGED_IN"){
          this.setState({
            loggedInStatus: true,
            back_response: 'ok'
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({
          back_response: 'error'
        });
      });
  }


  handleSuccessfulLogin() {
    console.log('worked');
    this.setState({
      loggedInStatus: true
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: false
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: false
    });
  };

  componentDidMount() {
    let token =  localStorage.getItem('token');
      if(token){
        this.checkLoginStatus(token);
       }
    }
  render() {
    if(this.state.back_response){
     return (
      <div className='app'>
        <Router>
         <div>
           <Switch>
             <Route exact path = "/"
                  render={props => (
                    <Home
                      {...props}
                      loggedInStatus={this.state.loggedInStatus}
                  />
                )}   
             />
             <Route path = "/signin" 
              render={props => (
                    <SignIn
                      {...props}
                      handleSuccessfulLogin={this.handleSuccessfulLogin}
                      handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )} />
             <Route 
                render={props => (
                    <SignUp
                      {...props}
                      handleSuccessfulLogin={this.handleSuccessfulLogin}
                      handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  /> )} />
           </Switch>
         </div>
       </Router>

      </div>
    );
    }
    else{
      return(
          <div> Loader</div>
      );
    }
  }
}
