import React, { Component } from 'react'
import GameCreate from './gameCreate';
import Auth from '../pages/auth';
import Game from './online';
export default class InitOnlineGame extends Component {

    constructor(props){
        super(props);
        this.state={
            game: false,
            userData:{},
        }
        this.renderComponent = this.renderComponent.bind(this);
        this.handleSuccessfulCreated = this.handleSuccessfulCreated.bind(this);
        this.handleUnSuccessfulStart = this.handleUnSuccessfulStart.bind(this);
        this.handleSuccessfulJoined = this.handleSuccessfulJoined.bind(this);
      }
      handleSuccessfulCreated(gameData){
        this.setState({
            game:true
        })

        this.setState({
            userData:gameData
        })
      }
      handleSuccessfulJoined(){
        console.log('error');
      }
      handleUnSuccessfulStart(){
        console.log('error');
      }
      renderComponent(){
        console.log('this.state.game',this.state.game)
        if(!this.props.loggedInStatus){
            return <Auth />;
        }
        else{
            if(!this.state.game){
                console.log('false');
                return <GameCreate  
                        handleSuccessfulCreated={this.handleSuccessfulCreated}
                        handleUnSuccessfulStart={this.handleUnSuccessfulStart}
                    /> 
            }
            else{
                return <Game userData={this.state.userData}/>
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
