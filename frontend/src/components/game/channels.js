import React, { Component } from 'react'
import { API_URL} from '../../config/env';
import axios from 'axios';
export default class Сhannels extends Component {
    constructor() {
        super();
    
        this.state = {
          channels: [],
          isLoading: false
        }; 
        this.getChannels = this.getChannels.bind(this);
      }
    getChannels(token) {
        this.setState({
            isLoading: true
          });
        let header = {headers: {
                Accept:'application/json',
                Authorization:`Bearer ${token}`
                }};  
        axios
          .get(API_URL+"channel/list",header)
          .then(response => {
            console.log("response channels", response);
            this.setState({
                isLoading: false,
                channels: [...response.data.channels]
            });
          })
          .catch(error => {
            console.log("error in channels", error);
          });    
      }
 
      componentDidMount() {
        let token =  localStorage.getItem('token');
        this.getChannels(token);
      }

    render() {
        if(this.state.isLoading != true){
            console.log('channels',this.state.channels);
            return (
                <div>
                    List
                </div>
            )
        }else{
            return (
                <div>
                    isLoading
                </div>
            )
        }

    }
}