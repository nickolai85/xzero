import React, { Component } from 'react';
import WithPc from './withPc';
import Menu from './menu';
import Auth from "../pages/auth";
import WithPlayer from './withPlayer';
import WithOnlinePlayer from './withOnlinePlayer';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(''),
      vs:'pc',
    };
    this.selectOpponent =this.selectOpponent.bind(this);
    this.selectOpponent =this.selectOpponent.bind(this);
    this.handleClick =this.handleClick.bind(this);

  }
  selectOpponent(e){
      let gameVs = e.target.id;
      this.setState({
        vs:gameVs
      })
  }
  handleClick(e) {
    return e;
  }
  renderGame(){
    console.log('this.state.vs)',this.state.vs);
    switch(this.state.vs) {
        case 'online':
          return !this.props.loggedInStatus ?
                  <Auth loggedInStatus={this.props.loggedInStatus}
                        open_auth_block={this.props.open_auth_block}
                  /> : <WithOnlinePlayer />
        break;
      case 'player':
        return <WithPc />
        break;
      default:
          return <WithPlayer
              squares = {this.state.squares}
              handleClick={this.handleClick}
          />
    }
  }
    render() {
        return (
          <div className="game-wrapper">
              {this.renderGame()}
            <div className="game-mode">
              <div><Menu selectOpponent={this.selectOpponent}/></div>
            </div>
          </div>
        );
      }
}