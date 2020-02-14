import React, { Component } from 'react';
import Board from './board';
import GameInfo from './gameInfo';
export default class WithPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(''),
          vs:'pc',
          my_name:'Player_1',
          my_score: 0,
          my_piece: 'x',
          opp_name:'Player_2',
          opp_score: 0,
          opp_piece: '0',
          round: 0,
          tie:0,
          myMove:true
        };
        this.handleClick = this.handleClick.bind(this);
      }
        handleClick = e => {
                console.log('e =>', e);
      };
    render() {
        return (
            <div>
                <GameInfo 
                              my_name={this.state.my_name}
                              my_score={this.state.my_score}
                              my_piece={this.state.my_piece}
                              opp_name={this.state.opp_name}
                              opp_score={this.state.opp_score}
                              opp_piece={this.state.opp_piece}
                              round={this.state.round}
                              tie={this.state.tie}
                />
                <Board
                  myMove = {this.state.myMove}
                  squares = {this.state.squares}
                  handleClick={this.handleClick}      
                />
            </div>
        );
    }
}