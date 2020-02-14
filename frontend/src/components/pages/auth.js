import React, { Component } from 'react';
import AuthMenu from "../auth/authMenu";
import Signin from "../auth/signIn";
import Signup from "../auth/signUp";
export default class Auth extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      renderView: 0
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }
    handleSuccessfulAuth() {
      this.props.handleSuccessfulLogin();
    }

    handleUnsuccessfulAuth() {
      this.props.handleUnsuccessfulLogin();
    }
   
      clickBtn = e => {
        this.setState({
          renderView: +e.target.value
        });
      };
      closeBlock = e => {
        this.props.open_auth_block();
      };
      render() {  
        return(
        <div>
          
            <a onClick={this.props.open_auth_block}>X</a>
          <div>
            {this.state.renderView == 1 ?  <Signup
                            handleSuccessfulAuth={this.handleSuccessfulAuth}
                            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
                          />: <Signin 
                            handleSuccessfulAuth={this.handleSuccessfulAuth}
                            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
                          /> }
          </div>
          <div>
            <AuthMenu clickBtn={this.clickBtn} />
          </div>
        </div>
        );
        }
      
}
