import React, { Component } from 'react';
import { ECHO_SERVER, API_URL} from '../config/env';
import NavigationContainer from './navigation/navigation';
import Auth from './pages/auth';
import axios from "axios";
import Home from './pages/home';
import SignIn from './auth/signIn';
import SignUp from './auth/signUp';
import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
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
      auth_block:false,
      userdata:""
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.open_auth_block = this.open_auth_block.bind(this);
    this.socket_connection = this.socket_connection.bind(this);
    this.test_channel = this.test_channel.bind(this);
    this.test_private = this.test_private.bind(this);
    
    
  }
   checkLoginStatus(token) {
    let data = {headers: {
        Accept:'application/json',
        Authorization:`Bearer ${token}`
        }};

        
    return axios
      .get(API_URL+"user",data)
      .then(response => {

        if(response.data.logged_in === "LOGGED_IN"){
          this.setState({
            loggedInStatus: true,
            userdata:{...response.data.user},
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
  open_auth_block(){
    if(this.state.auth_block){
        this.setState({
          auth_block: false
        });
    }else
    {
      this.setState({
        auth_block: true
      });
    }
    console.log('open_auth_block', this.state.auth_block)
  }

  handleSuccessfulLogin() {
    console.log('worked');
    this.setState({
      loggedInStatus: true
    });
    this.open_auth_block();
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

  socket_connection(token){
    let echo = new Echo({
      broadcaster: 'socket.io',
      client: Socketio,
      host: 'http://localhost:6001/'
  });
  }

  socket_connection(token) {
    try {
      window.io = require('socket.io-client')
      window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: ECHO_SERVER,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      })
      return
    } catch (error) {
      console.log(error)
      return
    }
  }

  test_channel(){
    window.Echo.channel('laravel_database_testCannel')
    .listen('TestEvent', (e) => {
      console.log('public channel event received',e);
    }); 
  }
  test_private(){
    window.Echo.private(`myproject_database_private-test.3`)
    .listen('TestPivateEvent', (e) => {
      console.log(e);
      console.log('Esti contact');
    });

  
  }

  componentDidMount() {
    let token =  localStorage.getItem('token');
      this.checkLoginStatus(token);
      this.socket_connection(token);
    //  this.test_channel();
      this.test_private()
      }
  render() {
    if(this.state.back_response){
     return (
      <div className='app'>
          <div>
          {this.state.auth_block === true ? <Auth 
                                handleSuccessfulLogin={this.handleSuccessfulLogin}
                                handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                                open_auth_block={this.open_auth_block}/>  :'' }  
          </div>

        <Router>
         <div>
         <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
              open_auth_block={this.open_auth_block}
              userdata={this.state.userdata}
            />
           <Switch>
             <Route exact path = "/"
                  render={props => (
                    <Home
                      {...props}
                      loggedInStatus={this.state.loggedInStatus}
                      open_auth_block={this.open_auth_block}
                  />
                )}   
             />
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
