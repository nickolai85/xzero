import React, { Component } from 'react';
import Chat from './chat';
//import Auth from './auth';
import Game from '../game/game';
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
   render() {
     return (
       <div>
            <div>
                <Game
                    loggedInStatus={this.props.loggedInStatus}
                    open_auth_block={this.props.open_auth_block}
                />
            </div>
       </div>
     );
   }
 }