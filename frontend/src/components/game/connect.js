import React, { Component } from 'react';
export default class Connect extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <h2>Create game</h2>
        <div className="content">
            <div>
                Create Game
            </div>
            <div>
                Connect
            </div>
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
