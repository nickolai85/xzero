import React, { Component } from 'react'
import GameCreate from './gameCreate';
import Auth from '../pages/auth';
import Game from './online';
export default class InitOnlineGame extends Component {

    constructor(props){
        super(props);
        this.state={
            game: false,
        }
        this.renderComponent = this.renderComponent.bind(this);
        this.handleSuccessfulCreated = this.handleSuccessfulCreated.bind(this);
        this.handleUnSuccessfulStart = this.handleUnSuccessfulStart.bind(this);
        this.handleSuccessfulJoined = this.handleSuccessfulJoined.bind(this);
      }
      handleSuccessfulCreated(){
        this.setState({
            game:true
        })
      }
      handleUnSuccessfulStart(){
        console.log('error');
      }
      handleSuccessfulJoined(){
        console.log('error');
      }
      renderComponent(){

        if(!this.props.loggedInStatus){
            return <Auth />;
        }
        else{
            if(this.state.game ===false){
                <GameCreate  
                    handleSuccessfulCreated={this.handleSuccessfulCreated}
                    handleSuccessfulJoined={this.handleSuccessfulJoined}
                    handleUnSuccessfulStart={this.handleUnSuccessfulStart}
                /> 
            }
            else{
                <Game
                
                />
            }
        }
      }
    render() {
        return (
            <div>
            {this.renderComponent()}
            </div>
        )
    }
}
