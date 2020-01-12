import React, { Component } from 'react'
import Square from './square';

export default class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
              }],
            stepNumber: 0,
        }
    }
    renderSquare(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        return (
          <Square
            value={current.squares[i]}
            onClick={() => this.handleClick(i)}
          />
        );
    }
    render() {
        return (
        <div>   
            <div className="board-row">
            {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div> 
        </div>
        )
    }
}
