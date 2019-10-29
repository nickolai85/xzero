import React, { Component } from 'react';
import axios from "axios";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
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
                console.log(response);

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