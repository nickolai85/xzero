import React, { Component } from 'react';

export default class EndGameModal extends Component {
        new_round = e => {
        this.props.new_round && this.props.new_round(e);
      };
      leave_game = e => {
        this.props.leave_game && this.props.leave_game(e);
      };
      render() {
        if (!this.props.show) {
          return null;
        }
        return (
          <div className="modal" id="modal">
            <h2>Modal Window</h2>
            <div className="actions">
              <button className="toggle-button" onClick={this.new_round}>
                Next round
              </button>
              <button className="toggle-button" onClick={this.leave_game}>
                Leave game
              </button>
            </div>
          </div>
        );
      }
}
