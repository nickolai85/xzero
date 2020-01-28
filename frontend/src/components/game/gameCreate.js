import React, { Component } from 'react';
import { API_URL} from '../../config/env';
import axios from 'axios';

export default class GameCreate extends Component {
  constructor(props){
    super(props);
    this.state={
        game_id: '',
        isLoading: false
    }
  }

    

   render() {
     if(!this.state.isLoading){
     return (
       <div>
            <div>
              <button value={'open'} className="toggle-button" onClick={this.props.handleSuccessfulCreated}>
                Create Game
              </button>
            </div>
            <div>
              <button value={'private'} className="toggle-button" onClick={this.props.handleSuccessfulCreated}>
                Create Private Game
              </button>
            </div>
            <div>
              <button className="toggle-button" onClick={this.props.handleSuccessfulCreated}>
                Connect
              </button>
            </div>
            <div>
            </div>
            
       </div>
     );
     }
     else{
       return (
          <div>
            isLoading
          </div>
       );
     }
   }
 }
