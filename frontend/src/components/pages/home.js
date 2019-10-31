import React, { Component } from 'react';
import Chat from './chat';
import Auth from './auth';
import Game from '../game/game';
export default class Home extends Component {

   render() {
     return (
       <div>
           {this.props.loggedInStatus ? <Chat /> : <Auth />}
            <div>
                <Game />
            </div>
       </div>
     );
   }
 }