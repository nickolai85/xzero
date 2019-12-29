import React, { Component } from 'react';
import Board from './board'
export default class Game extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      console.log('this.props.loggedInStatus',this.props.loggedInStatus)
        return (
          <div className="game">
            <div className="game-board">
              <Board
                    loggedInStatus={this.props.loggedInStatus}/>
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        );
      }
}