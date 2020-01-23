import React, { Component } from 'react';
import Board from './board';
import InitGame from './initOnlineGame';
import GameCreate from './gameCreate';
export default class WithOnlinePlayer extends Component {
  _isMounted = false;
    constructor(){
     super();
     this.state = {
        inGame: false,
        isOwner: false,
        opponent: false,
        gameData: '',
      };
      this.renderComponent = this.renderComponent.bind(this);
      this.handleSuccessfulCreated = this.handleSuccessfulCreated.bind(this);
      this.handleUnSuccessfulStart = this.handleUnSuccessfulStart.bind(this);
      this.handleSuccessfulJoined = this.handleSuccessfulJoined.bind(this);
      this.liveGame = this.liveGame.bind(this);

    }
    handleSuccessfulCreated(gameData){
      console.log('owner_gameData',gameData)
      this.setState({
        inGame:true,
        isOwner: true,
        gameData:gameData
      })
    }
    handleSuccessfulJoined(gameData){
      this.setState({
        inGame:true,
        userData:gameData
      })
    }
    handleUnSuccessfulStart(){
      console.log('error');
    }
    renderComponent(){
        if(this.state.inGame){
            return <Board 
                  />
        }
        return <GameCreate  
            handleSuccessfulCreated={this.handleSuccessfulCreated}
            handleSuccessfulJoined={this.handleSuccessfulJoined}
            handleUnSuccessfulStart={this.handleUnSuccessfulStart}
          />
    }
    liveGame(channelId){
    
      console.log('liveGame',channelId)
      window.Echo.channel('game.'+channelId)
      .listen('UserConnect',(e)=>{
        console.log('UserConnect',e);
          this.setState({
              opponent: e.data.opponent,
          });
      })
    }
    componentDidMount() {
/*      console.log('componentDidMount');
      this._isMounted = true;
      if(this.state.inGame){
        this.liveGame(this.state.gameData.id);
      }   
  */
    }
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      //if (this.props.userID !== prevProps.userID) {
       // this.fetchData(this.props.userID);
      //}
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
                {this.renderComponent()}
            </div>
        );
    }
}