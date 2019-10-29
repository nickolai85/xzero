import React, { Component } from 'react';
import Chat from './chat';
import Auth from './auth';
export default class Home extends Component {

   render() {
     return (
       <div>
           {this.props.loggedInStatus ? <Chat/> : <Auth/>}
       </div>
     );
   }
 }