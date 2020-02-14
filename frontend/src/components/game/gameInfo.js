import React, { Component } from 'react';

class GameInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.gameMenu = this.gameMenu.bind(this);
      }

      gameMenu(){

        return 
      }
    render() {
        var oppScore = 'Waiting ...';
        var oppName = 'Waiting ...' ;
        var oppPiece = 'Waiting ...';
          if(this.props.opponent){
             oppScore = this.props.opponent.score;
             oppName = this.props.opponent.name;
             oppPiece = this.props.piece === 'X' ? '0' : 'X';
          }
        return (
            
            <div className="game-info-wrapper">
                <div className="game-info-left">  
                    <div className="game-info-data">
                     {this.props.opp_name}
                    </div>
                    <div className="game-info-data">
                    {this.props.opp_piece}
                    </div>
                    <div className="game-info-data">
                    {this.props.opp_score}
                    </div>
                </div>
                <div className="game-info-center">
                    <div className="game-info-round">
                        Round: {this.props.round}
                    </div>
                    <div className="game-info-round">
                        Tie: {this.props.tie}
                    </div>
                </div>
                <div className="game-info-right">
                    <div className="game-info-data">
                    {this.props.my_name}
                    </div>
                    <div className="game-info-data">
                     {this.props.my_piece}
                    </div>
                    <div className="game-info-data">
                     {this.props.my_score}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameInfo;