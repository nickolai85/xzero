/*import React, { Component } from 'react'

export default class GameMenu extends Component {
    render() {
        return (
            <div className="game-vs">
                <button className={this.state.gameVs === 'pc' ? "active-pc-button" : "deactived-pc-button"} 
                   onClick={() => this.selectOpponent('pc')}
                   > PC
                </button>
                <button className={this.state.gameVs === 'player'  ? "active-player-button" : "deactived-player-button"} 
                   onClick={() => this.selectOpponent('player')}
                   > Player
                </button>
                <button className={this.state.gameVs === 'online' ? "active-online-button" : "deactived-online-button"} 
                   onClick={() => this.selectOpponent('online')}
                   > Online  player
                </button>
            </div>
        )
    }
}
*/
import React from "react";
export default props => (

    <div className = {"game_menu_wrapper"}>
        <div className={props.gameVs === 'pc' ? "active-pc-button" : "deactived-pc-button"}
                id='player' onClick={props.selectOpponent}>
            PC
        </div>
        <div id='pc' onClick={props.selectOpponent}
             className={props.gameVs === 'player' ? "active-pc-button" : "deactived-player-button"}
        >
            Player
        </div>
        <div 
            id='online' onClick={props.selectOpponent}
            className={props.gameVs === 'online' ? "active-pc-button" : "deactived-online-button"}
        >
            Online  player
        </div>
        
    </div>
);
