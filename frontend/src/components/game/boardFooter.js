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
          console.log('choosePiece');
          if(this.state.pieces.playerPiece === 'X'){
               this.setState({
                    pieces:{
                         playerPiece: '0',
                         oponentPiece: 'X'
                    }
               });
          }
          else{
               this.setState({
                    pieces:{
                         playerPiece: 'X',
                         oponentPiece: '0'
                    }
               });
          }
          this.props.playerPieces(this.state.pieces);
     }
   render() {
     return (
       <div>
           <div className="players">
                <h3 className="player_1">Player 1 <span onClick={() => this.choosePiece()} >({this.state.pieces.playerPiece})</span></h3>
                <h3 className="player_2">Player 2 <span>({this.state.pieces.oponentPiece})</span></h3>
           </div>

           <div className="score">
                <h3 className="score_1"> Score 1 (2) </h3>
                <h3 className="score_2"> Score (1) </h3>
           </div>
       </div>
     );
   }
 }
