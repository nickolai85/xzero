import React, { Component } from 'react';
import Board from './board';
import InitGame from './initOnlineGame';
import GameCreate from './gameCreate';
export default class WithOnlinePlayer extends Component {
    constructor(){
     super();
     this.state = {
        inGame: false,
      };
      this.renderComponent = this.renderComponent.bind(this);
      this.handleSuccessfulCreated = this.handleSuccessfulCreated.bind(this);
      this.handleUnSuccessfulStart = this.handleUnSuccessfulStart.bind(this);
      this.handleSuccessfulJoined = this.handleSuccessfulJoined.bind(this);
    }
    handleSuccessfulCreated(gameData){
      this.setState({
        inGame:true,
        response:gameData
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
            return <Board />
        }
        return <GameCreate  
            handleSuccessfulCreated={this.handleSuccessfulCreated}
            handleSuccessfulJoined={this.handleSuccessfulJoined}
            handleUnSuccessfulStart={this.handleUnSuccessfulStart}
    />
    }
    render() {
        return (
            <div>
                {this.renderComponent()}
            </div>
        );
    }
}