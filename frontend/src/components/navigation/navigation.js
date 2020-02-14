import React from "react";
import axios from "axios";
import {API_URL} from '../../config/env';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationComponent = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };
  const handleSignOut = () => {
console.log('handleSignOut');
let token =  localStorage.getItem('token');
    let data = {headers: {
      Accept:'application/json',
      Authorization:`Bearer ${token}`
      }};
    axios
      .get(API_URL+"logout",data)
      .then(response => {
        if (response.status === 200) {
       //   props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch(error => {
        console.log("Error signing out", error);
      });
  };
  const handleSignIn = () => {
    props.open_auth_block();
  };
  return (
    <div className="nav-wrapper">
      <div className="left-side">
        ZerOX
      </div>
      <div className="right-side">
          {props.loggedInStatus === true ? (
          <div >
            <div>{props.userdata.name}
          </div>
            <a onClick={handleSignOut}>Sign Out</a>
          </div>) : (<a onClick={handleSignIn}>Sign In</a>)}
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);