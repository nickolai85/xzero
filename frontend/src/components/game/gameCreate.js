import React, { Component } from 'react';
import { API_URL} from '../../config/env';
import axios from 'axios';
import Channels from './channels';
export default class GameCreate extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.GameCreate = this.GameCreate.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }
  GameCreate(e) {
    let type = e.target.value;
    let token =  localStorage.getItem('token');
    let code = '';
    let status = 'opened';
    if(type == 'private'){
      code = 'generated_code';
    }

    let data = {
      game_id: 1,
      code: code,
      status: status,
    };
    let header = {headers: {
      Accept:'application/json',
      Authorization:`Bearer ${token}`
      }};
  return axios
  .post(API_URL+"channel/create",data,header)
    .then(response => {

    })
    .catch(error => {
      console.log("Error", error);
      this.setState({
        back_response: 'error'
      });
    });
  }
    
  joinGame(e) {
    console.log('joinGame',e);
  }
   render() {
     return (
       <div>
            <div>
              <button value={'open'} className="toggle-button" onClick={this.GameCreate}>
                Create Game
              </button>
            </div>
            <div>
              <button value={'private'} className="toggle-button" onClick={this.GameCreate}>
                Create Private Game
              </button>
            </div>
            <div>
              <button className="toggle-button" onClick={this.joinGame}>
                Connect
              </button>
            </div>
            <div>
              <Channels />
            </div>
            
       </div>
     );
   }
 }
