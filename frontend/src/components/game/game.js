import React, { Component } from 'react';
import WithPc from './withPc';
import Menu from './menu';
import InitGame from "./initOnlineGame";
import WithPlayer from './withPlayer';
import WithOnlinePlayer from './withOnlinePlayer'
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vs:'pc',
    };
    this.selectOpponent =this.selectOpponent.bind(this);
  }
  selectOpponent(e){
      let gameVs = e.target.id;
      this.setState({
        vs:gameVs
      })
  }
  renderGame(){
    console.log('this.state.vs)',this.state.vs);
    switch(this.state.vs) {
        case 'online':
          //return <InitGame loggedInStatus={this.props.loggedInStatus} />
          return !this.props.loggedInStatus ? <Auth /> : <WithOnlinePlayer />
        break;
      case 'player':
          return <WithPlayer />
        break;
      default:
        return                <WithPc
        loggedInStatus={this.props.loggedInStatus}
        open_auth_block={this.props.open_auth_block}
        />
    } 
  }
    render() {
      console.log('this.props.loggedInStatus',this.props.loggedInStatus)
        return (
          <div className="game">
            <div className="game-board">

              {this.renderGame()}
                     
            </div>
            <div className="game-menu">
              <div><Menu selectOpponent={this.selectOpponent}/></div>
            </div>
          </div>
        );
      }
}