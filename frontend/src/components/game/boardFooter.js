import React, { Component } from 'react';


export default class BoardFooter extends Component {
     constructor(props) {
          super(props);
          this.state = {
               pieces:{
                    playerPiece: 'X',
                    oponentPiece: '0'
               }
          };
          this.choosePiece = this.choosePiece.bind(this);
        }
     choosePiece(){
          let player_piece = '';
          let opponent_piece = '';

          if(this.state.pieces.playerPiece === 'X'){
                player_piece = '0';
                opponent_piece = 'X';
          }
          else{
               player_piece = 'X';
               opponent_piece = '0';
          }

          this.setState({
               pieces:{
                    playerPiece: player_piece,
                    oponentPiece: opponent_piece
               }
          });

          this.props.playerPieces(
               { pieces:{
               playerPiece: player_piece,
               oponentPiece: opponent_piece
          }});
     }

   render() {
     return (
       <div>
           <div className="players_wrapper">
                <h3 className="player_1">Player 1 <span onClick={() => this.choosePiece()} >({this.state.pieces.playerPiece})</span></h3>
                <h3 className="player_2">Player 2 <span>({this.state.pieces.oponentPiece})</span></h3>
           </div>
          <div className="score_wrapper">
               <h3 className="score">
                  Round : {this.props.round}
               </h3>
          </div>
           <div className="score_wrapper">
                <h3 className="score_1"> Score 1 ({this.props.playerScore}) </h3>
                <h3 className="tie">Tie {this.props.tie}</h3>
                <h3 className="score_2"> Score 2 ({this.props.opponentScore}) </h3>
           </div>
       </div>
     );
   }
 }
