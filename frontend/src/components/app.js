import React, { Component } from 'react';
import Auth from './pages/auth';
import axios from "axios";
import Home from './pages/home';
import SignIn from './auth/signIn';
import SignUp from './auth/signUp';

import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
//import socketIOClient from 'socket.io-client'


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
  /*  const socket = socketIOClient('http://0.0.0.0:6007');
    //setInterval(this.send(), 1000)
    socket.on('myproject_database_chat', (col) => {
      let obj = JSON.parse(col);
      console.log(obj.event);
    })
    */
  /*  let token =  localStorage.getItem('token');
      if(token){
        this.checkLoginStatus(token);
       }
       */
  let echo = new Echo({
        broadcaster: 'socket.io',
        client: Socketio,
        host: 'http://0.0.0.0:6001'
  });
  let idu = 77;
  echo.private(`myproject_database_private-user.${idu}`)
   .listen('UserSignedUp', (e) => {
     console.log(e);
      console.log('Esti contact');
   });
   echo.channel('myproject_database_chat')
   .listen('UserSignedUp', (e) => {
       console.log('public channel event received');
   });


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
                      handleSuccessfulLogout={this.handleSuccessfulLogout}
                  />
                )}   
             />
             <Route path = "/signin" 
              render={props => (
                    <SignIn
                      {...props}
                      handleSuccessfulLogin   = {this.handleSuccessfulLogin}
                      handleUnsuccessfulLogin = {this.handleUnsuccessfulLogin}
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
