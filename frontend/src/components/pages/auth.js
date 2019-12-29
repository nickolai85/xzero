import React, { Component } from 'react';
import AuthMenu from "../auth/authMenu";
import Signin from "../auth/signIn";
import Signup from "../auth/signUp";
export default class Auth extends Component  {
    state = {
        renderView: 0
      };
    
      clickBtn = e => {
        this.setState({
          renderView: +e.target.value
        });
      };
    
      render() {
        switch (this.state.renderView) {
          case 1:
            return <Signin />;
          case 2:
            return <Signup />;
          default:
            return <AuthMenu clickBtn={this.clickBtn} />;
        }
      }
}
