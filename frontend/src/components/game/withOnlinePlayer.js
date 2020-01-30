import React, { Component } from 'react';
import { API_URL} from '../../config/env';
import axios from 'axios';
import Board from './board';
import GameCreate from './gameCreate';
import Channels from './channels';
import EndGameModal from './endGameModal'
export default class WithOnlinePlayer extends Component {
  _isMounted = false;
    constructor(){
     super();
     this.state = {
        squares: Array(9).fill(''),
        inGame: false,
        isOwner: false,
        opponent: false,
        gameData: '',
        piece: '',
        myMove:false,
        isListen:false,
        round: 1,
        myScore: 0,
        opponentScore:0,
        tie:0,
        end_gameNotif:false

      };
      this.renderComponent = this.renderComponent.bind(this);
      this.handleSuccessfulCreated = this.handleSuccessfulCreated.bind(this);
      this.handleUnSuccessfulStart = this.handleUnSuccessfulStart.bind(this);
      this.handleSuccessfulJoined = this.handleSuccessfulJoined.bind(this);
      this.liveGame = this.liveGame.bind(this);
      this.sendMove = this.sendMove.bind(this);
      this.handleMoveEvent = this.handleMoveEvent.bind(this);
      this.calculateWinner = this.calculateWinner.bind(this);
      this.new_round = this.new_round.bind(this);
      this.gameMenu = this.gameMenu.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.GameEnd = this.GameEnd.bind(this);
      this.leave_game = this.leave_game.bind(this);
      
    }

    handleSuccessfulCreated(e) {
      this.setState({
        isLoading: true
      });
      let type = e.target.value;
      let token =  localStorage.getItem('token');
      let code = '';
      let status = 'opened';
      if(type == 'private'){
        code = 'generated_code';
      }
      let data = {
        game_id: 1,
        code: code,
        status: status,
      };
      let header = {headers: {
        Accept:'application/json',
        Authorization:`Bearer ${token}`
        }};
    return axios
    .post(API_URL+"channel/create",data,header)
      .then(response => {
        this.setState({
          piece: 'X',
          inGame:true,
          isOwner: true,
          gameData:response.data,
          isListen:true
        })
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({
          back_response: 'error'
        });
      });
    }

    handleSuccessfulJoined(e) {
      let channel = e.target.id;
      let token =  localStorage.getItem('token');
      let data = {
        game_id: 1
      };
      let header = {headers: {
        Accept:'application/json',
        Authorization:`Bearer ${token}`
        }};
        return axios
      .put(API_URL+"channel/join/"+channel,data,header)
      .then(response => {
        var resData = response.data.message;
        this.setState({
          inGame:true,
          isOwner: false,
          piece: '0',
          gameData:resData.channel,
          opponent:resData.opponent,
          isListen:true,
          myMove:false,
        })
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({
          back_response: 'error'
        });
      });
    }

    handleUnSuccessfulStart(){
      console.log('error');
    }

    sendMove(e) {
      let channel = this.state.gameData.id;
      let token =  localStorage.getItem('token');
      let data = {
        square: e,
        piece:this.state.piece,
        to:this.state.opponent.id
      };
      let header = {headers: {
        Accept:'application/json',
        Authorization:`Bearer ${token}`
        }};
        return axios
      .post(API_URL+"channel/move/"+channel,data,header)
      .then(response => {
        this.setState({
          isListen:true
        })
      })
      .catch(error => {
        console.log("Error", error);
      });
    }

    handleMoveEvent(square,piece){
      const squares = this.state.squares.slice();
      squares[square.move] = piece;
      this.setState({
        squares: squares,
        myMove:true,
        isListen:false
      });
      if(square.end_round){
        if(square.end_round === 'gameOver'){
         var tie_game = this.state.tie+1; 
          this.setState({
            tie:tie_game,
            myMove:false,
            end_gameNotif:true
          });
        }
        else{
          var oppScore = this.state.opponentScore+1; 
          this.setState({
            opponentScore:oppScore,
            myMove:false,
            end_gameNotif:true
          });
        }
    }  

  }

  GameEnd(){
    this.setState({
      end_gameNotif:true
    })
  }

  new_round = e =>{
    var newPiece = this.state.piece === 'X' ? '0' : 'X';
    var myMove_ = newPiece === 'X' ? true : false;
    var newRound = this.state.round+1; 
    this.setState({
        squares: Array(9).fill(null),
        piece: newPiece,
        round: newRound,
        end_gameNotif:false,
        myMove:myMove_,
    })
  }
  leave_game = e =>{
      alert('Game leaved');
      this.setState({
        squares: Array(9).fill(null),
        piece: 'p',
        round: 0,
        end_gameNotif:false,
        myMove: false,
    })
  }

  handleClick = e => {
    if(this.state.myMove){
      const squares = this.state.squares.slice();
      squares[e] = this.state.piece;
      this.setState({
        squares: squares,
        myMove:false
      }); 
      
      var winner = this.calculateWinner(squares);
      var rs={
        move:e,
        end_round:winner
      }
      this.sendMove(rs);
      if(winner){
        if(winner === 'gameOver'){
         var tie_game = this.state.tie+1; 
          this.setState({
            tie:tie_game,
            end_gameNotif:true
          });
        }
        if(winner === this.state.piece){
          var myScore_game = this.state.myScore+1; 
          this.setState({
            myScore:myScore_game,
            end_gameNotif:true
          });
        }
    }  

    }
  };
    renderComponent(){
        if(this.state.inGame){
               
          return <Board
                      squares = {this.state.squares}
                      myMove= {this.state.myMove}
                      piece={this.state.piece}
                      handleClick={this.handleClick}      
            />
        }
        return  <div>
                  <GameCreate  
                      handleSuccessfulCreated={this.handleSuccessfulCreated}
                  />
                  <Channels  handleSuccessfulJoined={this.handleSuccessfulJoined}/> 
                </div>
    }
    liveGame(channelId){
      var myId = localStorage.getItem('id');
      window.Echo.channel('game.'+channelId)
      .listen('UserConnected',(e)=>{
          var resData= e.message.original;
          this.setState({
              opponent: resData.data,
              myMove: true,
              isListen:false
          });
      })
      .listen('UserMove_'+myId,(e)=>{
          var resData= e.message.original;
          this.handleMoveEvent(resData.data.square,resData.data.piece);
      })
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

  gameMenu(){
    var oppScore = 'Waiting ...';
    var oppName = 'Waiting ...' ;
    var oppPiece = 'Waiting ...';
      if(this.state.opponent){
         oppScore = this.state.opponentScore;
         oppName = this.state.opponent.name;
         oppPiece = this.state.piece === 'X' ? '0' : 'X';
      }
    return <div>

             <div>
                Opponent: 
                <div>
                 {oppName}
                </div>
                <div>
                 {oppPiece}
                </div>
                <div>
                 {oppScore}
                </div>

              </div>
              <div>
                Tie 
                <div>
                  {this.state.tie}
                </div>
              </div>
              <div>
                Me: 
                <div>

                </div>
                <div>
                 {this.state.piece}
                </div>
                <div>
                 {this.state.myScore}
                </div>

              </div>

           </div>
            

  }

    componentDidMount() {

      // if(this.state.inGame){
      //   this.liveGame(this.state.gameData.id);
      // }   
 
    }
    componentDidUpdate(prevProps) {

      if(this.state.inGame || this.state.isListen){
        this.liveGame(this.state.gameData.id);
      }   

    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    render() {
        return (
            <div>
              <div>
                {this.gameMenu()}
              </div>
              <div>
                {this.renderComponent()}
              </div>
                <div>
                    <EndGameModal new_round={this.new_round} leave_game={this.leave_game}  show={this.state.end_gameNotif}/>
                </div>
            </div>
        );
    }
}