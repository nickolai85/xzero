import React, { Component } from 'react'
import Board from './board';
export default class Online extends Component {
    constructor(){
        super();
        this.state ={
            history: [{
                squares: Array(9).fill(null)
                }],
            status: 'create',
            userData:this.props.userData
        }
        this.liveGame = this.liveGame.bind(this);
    }
    liveGame(channelId){
        window.Echo.private(`game.${channelId}`)
        .listen('UserConnect',(e)=>{
            console.log('UserConnected',e);
        })
    }
    componentDidMount() {
        this.liveGame(this.state.userData.id);
    }     
    render() {
        return (
            <div>
                <Board />
            </div>
        )
    }
}
