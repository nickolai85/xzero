import React, { Component } from 'react';
import axios from "axios";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
      }
      handleSuccessfulLogout(){
        this.props.history.push("/");
        this.props.handleSuccessfulLogout();
      }
      handleSignOut(){
          console.log('handleSignOut');
        let token = localStorage.getItem('token');
        let data = {headers: {
            Accept:'application/json',
            Authorization:`Bearer ${token}`
            }};
        return axios
          .get("http://localhost:10077/api/logout",data)
          .then(response => {
            if (response.status === 200) {
                this.handleSuccessfulLogout();
              }
          })
          .catch(error => {
            console.log("Error", error);
            this.setState({
              back_response: 'error'
            });
          });
      }
   render() {
     return (
       <div>
           <h2>Chat</h2>
           <a onClick={this.handleSignOut}>
                Sign Out
          </a>
       </div>
     );
   }
 }