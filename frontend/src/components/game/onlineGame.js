import React, { Component } from 'react'
import Board from './board';
//to remove
export default class Online extends Component {
    constructor(props){
        super(props);
        this.state ={
            history: [{
                squares: Array(9).fill(null)
                }],
            status: 'create',
            gameData:this.props.gameData,
            playerOne:'',
            playerTwo:'',
        }
        this.liveGame = this.liveGame.bind(this);
        this.initGame = this.initGame.bind(this);
    }
    liveGame(channelId){
        console.log('liveGame',channelId)
        window.Echo.channel('game.'+channelId)
        .listen('UserConnect',(e)=>{
            this.setState({
                playerTwo: e.data.opponent,
            });
        })
    }

    componentDidMount() {        
       // this.liveGame(this.state.gameData.id);
    }     
    render() {
        return (
            
            <div>
                <div>
                    <div>
                        Player: 
                    </div>
                    <div>

                    </div>
                    <div>
                        Opponent: 
                    </div>

                </div>
                <Board />
            </div>
        )
    }
}
