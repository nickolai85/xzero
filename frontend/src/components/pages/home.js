import React, { Component } from 'react';
import Chat from './chat';
import Auth from './auth';
import Game from '../game/game';
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
   render() {
     console.log('this.props.loggedInStatus',this.props.loggedInStatus)
     return (
       <div>
           {this.props.loggedInStatus ? <Chat /> : <Auth />}
            <div>
                <Game
                    loggedInStatus={this.props.loggedInStatus}
                />
            </div>
       </div>
     );
   }
 }