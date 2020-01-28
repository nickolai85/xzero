import React, { Component } from 'react';
import { API_URL} from '../../config/env';
import axios from 'axios';
import Board from './board';
import GameCreate from './gameCreate';
import Channels from './channels';
export default class WithOnlinePlayer extends Component {
  _isMounted = false;
    constructor(){
     super();
     this.state = {
        inGame: false,
        isOwner: false,
        opponent: false,
        gameData: '',
        piece: ''
      };
      this.renderComponent = this.renderComponent.bind(this);
      this.handleSuccessfulCreated = this.handleSuccessfulCreated.bind(this);
      this.handleUnSuccessfulStart = this.handleUnSuccessfulStart.bind(this);
      this.handleSuccessfulJoined = this.handleSuccessfulJoined.bind(this);
      this.liveGame = this.liveGame.bind(this);

    }
    // handleSuccessfulCreated(){
    //  // console.log('owner_gameData',gameData)
    //   this.setState({
    //     inGame:true,
    //     isOwner: true,
    //   //  gameData:gameData
    //   })
    // }
    handleSuccessfulCreated(e) {
      this.setState({
        isLoading: true
      });
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
        this.setState({
          inGame:true,
          isOwner: true,
          gameData:response.data
        })
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({
          back_response: 'error'
        });
      });
    }
    handleSuccessfulJoined(e) {
      let channel = e.target.id;
      let token =  localStorage.getItem('token');
      let data = {
        game_id: 1
      };
      let header = {headers: {
        Accept:'application/json',
        Authorization:`Bearer ${token}`
        }};
        return axios
      .put(API_URL+"channel/join/"+channel,data,header)
      .then(response => {
        console.log('handleSuccessfulJoined',response);
        var resData = response.data.message;
        console.log('resData.channel',resData.channel);
        console.log('resData.opponent',resData.opponent);
        this.setState({
          inGame:true,
          isOwner: false,
          gameData:resData.channel,
          opponent:resData.opponent
        })
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({
          back_response: 'error'
        });
      });
    }

    handleUnSuccessfulStart(){
      console.log('error');
    }
    renderComponent(){
        if(this.state.inGame){
            return <Board />
        }
        return  <div>
                  <GameCreate  
                      handleSuccessfulCreated={this.handleSuccessfulCreated}
                  />
                  <Channels  handleSuccessfulJoined={this.handleSuccessfulJoined}/> 
                </div>
    }
    liveGame(channelId){
      
      console.log('liveGame',channelId)
      window.Echo.channel('game.'+channelId)
      .listen('UserConnected',(e)=>{

        console.log('UserConnected',e.message.original);
          var resData= e.message.original;
          this.setState({
              opponent: resData.data,
          });
      })
    }
    componentDidMount() {

      if(this.state.inGame){
        this.liveGame(this.state.gameData.id);
      }   
 
    }
    componentDidUpdate(prevProps) {

      if(this.state.inGame){
        console.log('this.state.gameData.id',this.state.gameData.id)
        this.liveGame(this.state.gameData.id);
      }   

    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    render() {
        return (
            <div>
              <div>
                Opponent: {this.state.opponent ? this.state.opponent.name : 'Waiting' }
              </div>
                {this.renderComponent()}
            </div>
        );
    }
}