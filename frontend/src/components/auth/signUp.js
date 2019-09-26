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
      localStorage.setItem('token', response.data.token)
  
    })
    .catch(error =>{
      console.log(error);
    }
    )


  console.log(data);
  console.log(API_URL);
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
            Login
        </button>
      </form>
    </div>
     );
   }
 }