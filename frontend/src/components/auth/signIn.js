import React, { Component } from 'react';
import { API_URL} from '../../config/app';
import axios from 'axios';
export default class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }
  handleSuccessfulAuth() {
    this.props.handleSuccessfulLogin();
    this.props.history.push("/");
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
  }


  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value,
        errorText: ""
    });
  }
  handleSubmit(event){

    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    let header = {
      headers: {
        Accept: 'application/json',
      }
    }

    axios.post(API_URL+"api/signin",data,header)
      .then(response =>{
        if(response.data.token !=''){
          localStorage.setItem('token', response.data.token);
          this.handleSuccessfulAuth();
        } else{
          this.setState({
            errorText: "Wrong email or password"
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch(error =>{
        console.log('error',error);
      }
      )
    event.preventDefault();
  }

   render() {
     return (
      <div>
      <h1>SIGNIN TO ACCESS YOUR DASHBOARD</h1>
      <div>{this.state.errorText}</div>
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">
            Login
        </button>
      </form>
    </div>
     );
   }
 }