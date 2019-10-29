import React, { Component } from 'react';
import { API_URL} from '../../config/app';
import axios from 'axios';
export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      email: "",
      password:"",
      password_confirmation:"",
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
    name: this.state.name,
    password: this.state.password,
    password_confirmation: this.state.password_confirmation,
  };
  let header = {
    headers: {
      Accept: 'application/json',
    }
  }
  
  axios.post(API_URL+"api/signup",data,header)
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
      console.log(error);
    }
    )
  event.preventDefault();
}

   render() {
     return (
      <div>
      <h1>SIGNUP TO ACCESS YOUR DASHBOARD</h1>

      <div>{this.state.errorText}</div>

      <form onSubmit={this.handleSubmit}>
        <input
          type="name"
          name="name"
          placeholder="Your name"
          value={this.state.name}
          onChange={this.handleChange}
        />
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Your password"
          value={this.state.password_confirmation}
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">
            Signup
        </button>
      </form>
    </div>
     );
   }
 }