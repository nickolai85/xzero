import React, { Component } from 'react';
import Square from './square';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null)
          }],
          stepNumber: 0,
          xIsNext: true
        };
        this.calculateWinner = this.calculateWinner.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
      }
      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }
      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }

      calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
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
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[this.state.stepNumber];
      const winner =  this.calculateWinner(current.squares);
     // console.log('length',history.length);

      const moves = (history)=>{
        
        const moveNumber = history.length-1;
        const last_move = this.state.history.length;
        const jumPback =  moveNumber!= 0 ? moveNumber - 1 : 0;
        const jumForward =  history.length >= last_move ? 0 : moveNumber + 1;
        const display_back = jumPback !=0 ? 'block': 'none';
        const display_forward = jumForward !=0 ? 'block': 'none';
        

        return(
            <div>
                <div>
                   Move {moveNumber}
                </div>
                
                <div  style = {{display: display_back}}><button onClick={() => this.jumpTo(jumPback)}>{'<- Back'}</button></div>
                <div><button onClick={() => this.jumpTo(0)}>{'Game start'}</button></div>
                <div style  =  {{display: display_forward}}><button onClick={() => this.jumpTo(jumForward)}>{'Forward ->'}</button></div>
            </div>
        );
      };

     // const moves = history.map((step, move) => {
     //   console.log(move);
     //   const desc = move ?
     //     'Go to move #' + move :
     //     'Go to game start';
      //  return (
      //    <li key={move}>
      //      <button onClick={() => this.jumpTo(move)}>{desc}</button>
      ///    </li>
      //  );
     // });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      
    console.log(this.state.squares);
        return (
          <div>
            <div className="status">{status}</div>
            <ol>{moves(history)}</ol>

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
        );
      }
}