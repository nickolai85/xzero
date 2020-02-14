import React, { Component } from 'react'
import Square from './square';

export default class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            stepNumber: 0,
        }
       // this.handleClick=this.handleClick.bind(this);
    }
    // handleClick(i){
    //   if(this.props.myMove){
    //     const squares = this.props.squares.slice();
    //     squares[i] = this.props.piece;
    //     this.setState({
    //       squares: squares,
    //     });
    //     this.props.handleMove(i)
    //   }
    // }

    renderSquare(i) {
        return (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.handleClick(i)}
          />
        );
    }
    render() {
        return (
          <div className="game-board-wrapper `{this.props.myMove ? 'active_board' : 'disabled_board'}`">   
           {console.log('square_props',this.props)}
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
