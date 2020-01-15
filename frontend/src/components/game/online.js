import React, { Component } from 'react'
import Board from './board';
export default class Online extends Component {
    constructor(props){
        super(props);
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
        console.log('liveGame',channelId)
        window.Echo.private('game.'+channelId)
        .listen('UserConnect',(e)=>{
            console.log('UserConnected',e);
        })
    }
    componentDidMount() {
        console.log('componentDidMount',this.props)
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
