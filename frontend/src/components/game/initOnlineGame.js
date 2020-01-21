import React, { Component } from 'react'
import GameCreate from './gameCreate';
import Auth from '../pages/auth';
import OnlineGame from './onlineGame';
//to remove
export default class InitOnlineGame extends Component {

    constructor(props){
        super(props);
        this.state={
            game: false,
            response:'',
        }
        this.renderComponent = this.renderComponent.bind(this);
        this.handleSuccessfulCreated = this.handleSuccessfulCreated.bind(this);
        this.handleUnSuccessfulStart = this.handleUnSuccessfulStart.bind(this);
        this.handleSuccessfulJoined = this.handleSuccessfulJoined.bind(this);
      }
      handleSuccessfulCreated(gameData){
        this.setState({
            game:true,
            response:gameData
        })
      }
      handleSuccessfulJoined(gameData){
        this.setState({
            game:true,
            userData:gameData
        })
      }
      handleUnSuccessfulStart(){
        console.log('error');
      }
      renderComponent(){
        console.log('init state',this.state)
        if(!this.props.loggedInStatus){
            return <Auth />;
        }
        else{
            if(!this.state.game){
                console.log('false');
                return <GameCreate  
                        handleSuccessfulCreated={this.handleSuccessfulCreated}
                        handleSuccessfulJoined={this.handleSuccessfulJoined}
                        handleUnSuccessfulStart={this.handleUnSuccessfulStart}
                    /> 
            }
            else{
                return <OnlineGame userData={this.state.userData}/>
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
