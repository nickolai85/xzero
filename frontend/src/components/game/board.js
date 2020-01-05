import React, { Component } from 'react';
import Square from './square';
import BoardFooter from './boardFooter';
import Connect from './connect';
export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null)
          }],
          stepNumber: 0,
          xIsNext: true,
          player:{
              piece: 'X',
              score: 0,
          },
          opponent:{
              piece: '0',
              score: 0,
          },
          round: 1,
          roundStatus: 'game',
          tie:0,
          gameVs:'pc',
          onlineModal: false
        };
        this.calculateWinner = this.calculateWinner.bind(this);
        this.playerPieces = this.playerPieces.bind(this);
        this.opponent_move = this.opponent_move.bind(this);  
        this.move = this.move.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
        this.newRound = this.newRound.bind(this);
        this.pcMove = this.pcMove.bind(this);
        this.nextPlayerMove = this.nextPlayerMove.bind(this);
        this.onlineMove = this.onlineMove.bind(this);
        this.selectOpponent = this.selectOpponent.bind(this);
    }
    playerPieces(piece){
        this.clearHistory();
        const playerPiece = piece.pieces.playerPiece;
        const oponentPiece = piece.pieces.oponentPiece; 

          this.setState({
            player:{
              piece: playerPiece,
              score: this.state.player.score
          },
          opponent:{
              piece: oponentPiece,
              score: this.state.opponent.score
          }
          });

          if(playerPiece != 'X'){
            this.opponent_move(oponentPiece);
          }              
      }
    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }
    newRound(){
      let player_piece = '';
      let opponent_piece = '';
      let gameRound = this.state.round;
      gameRound +=1;

      if(this.state.player.piece === 'X'){
            player_piece = '0';
            opponent_piece = 'X';
      }
      else{
           player_piece = 'X';
           opponent_piece = '0';
      }
      this.setState({
        roundStatus: 'game',
        round: gameRound,
      })
      this.playerPieces(
           { pieces:{
           playerPiece: player_piece,
           oponentPiece: opponent_piece
      }});
      
    }

    clearHistory(){
      const step = 0;
      this.setState({
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    

    move(i,piece){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      const checkWin = squares[i];

      squares[i] = piece;
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });

      if (this.calculateWinner(squares) || checkWin) {
        console.log('this.calculateWinner(squares)',this.calculateWinner(squares));
        let playerScore = this.state.player.score;
        let opponentScore = this.state.opponent.score;
        let gameRound = this.state.round;
      
        if(this.calculateWinner(squares) === this.state.player.piece){
          playerScore +=1;
        }
        if(this.calculateWinner(squares) === this.state.opponent.piece){
          opponentScore +=1;
        }
          let gameTie = gameRound - (playerScore + opponentScore);
          this.setState({
          player:{
            piece: this.state.player.piece,
            score: playerScore
          },
          opponent:{
            piece: this.state.opponent.piece,
            score: opponentScore
          },
          tie: gameTie,
          roundStatus: 'end',
        })
        return;
      }
    }

    handleClick(i) {
      if(this.state.roundStatus !='end'){
          const playerPiece = this.state.player.piece;
          const oponentPiece = this.state.opponent.piece;
          this.move(i,playerPiece);
          this.opponent_move(oponentPiece);
      }else{
        this.newRound();
      }
    }
    pcMove(oponentPiece){
      setTimeout(() => {
        if(this.state.roundStatus !='end'){
        const moveNumber = this.state.history.length-1;
        const current = this.state.history[moveNumber].squares;
      
        let empty_ceils = []
        for (var j = 0; j < current.length; j++) {
          if(current[j] === null){
            empty_ceils.push(j);
          }
        }
        let i = empty_ceils[Math.floor(Math.random() * empty_ceils.length)];
        const piece = oponentPiece;
        this.move(i,piece);
      }else{
        this.newRound();
      }
      },500)

    }
    nextPlayerMove(){
      console.log('nextPlayerMove');
      return; 
    }
    onlineMove(){
      console.log('onlineMove');
      return;
    }

    opponent_move(oponentPiece){
      const game_vs = this.state.gameVs
      console.log('game_vs',game_vs);
      switch(game_vs) {
        case 'pc':
              this.pcMove(oponentPiece);
          break;
        case 'player':
            this.onlineMove();
          break;
        case 'online':
            this.nextPlayerMove();
        break;
        default:
          console.log('no one')
      }

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

    selectOpponent(gameVs){
      this.setState({gameVs: gameVs});
      this.clearHistory();
      const gameModal = gameVs != 'online'? false : true;
      this.setState({
        onlineModal: gameModal
      });
    }

    showModal = e => {
      this.setState({
        onlineModal: false
      });
    };
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
      console.log('this.state',this.state);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner =  this.calculateWinner(current.squares);
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

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
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

            <div className="game-info">
              <BoardFooter 
                  playerPiece = {this.state.player.piece}
                  oponentPiece = {this.state.opponent.piece}
                  playerScore  = {this.state.player.score}
                  opponentScore = {this.state.opponent.score}
                  tie = {this.state.tie}
                  round = {this.state.round}
                  playerPieces = {this.playerPieces}
              />
            </div>
            
            <div className="game-vs">
                <div className={this.state.gameVs === 'pc' ? "active-pc-button" : "deactived-pc-button"} 
                   onClick={() => this.selectOpponent('pc')}
                   > PC
                </div>
                <div className={this.state.gameVs === 'player'  ? "active-player-button" : "deactived-player-button"} 
                   onClick={() => this.selectOpponent('player')}
                   > Player
                </div>
                <div className={this.state.gameVs === 'online' ? "active-online-button" : "deactived-online-button"} 
                   onClick={() => this.selectOpponent('online')}
                   > Online  player
                </div>
            </div>
            <div className = "game-modal">
              <Connect onClose={this.showModal}  
                        show={this.state.onlineModal}
                        loggedInStatus={this.props.loggedInStatus}
                        open_auth_block={this.props.open_auth_block}
                        />
            </div>
          </div>
        );
    }
}