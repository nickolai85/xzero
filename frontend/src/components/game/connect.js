import React, { Component } from 'react';
import GameCreate from './gameCreate';
import Auth from '../pages/auth';
export default class Connect extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    console.log('connect ',this.props.loggedInStatus)
    return (
      <div className="modal" id="modal">
        <h2>Create game</h2>
        <div className="content">

        {this.props.loggedInStatus ? <GameCreate /> : <Auth />}
 
        </div>

        <div className="actions">
          <button className="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
    );
  }
}
