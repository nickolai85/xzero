import React, { Component } from 'react'
import { API_URL} from '../../config/env';
import Channel from '../game/channel';
import axios from 'axios';
export default class Сhannels extends Component {
  _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          channels: [],
          isLoading: false,
          isMounted: false
        }; 
        this.getChannels = this.getChannels.bind(this);
        this.activeChannels = this.activeChannels.bind(this);
    //    this.selectChannel = this.selectChannel.bind(this);
        this.listen_NewChannels = this.listen_NewChannels.bind(this);
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
            if (this.state.isMounted) {
            this.setState({
                isLoading: false,
                channels: [...response.data.channels]
            });
          }
          })
          .catch(error => {
            console.log("error in channels", error);
          });    
      }
      listen_NewChannels(){
        window.Echo.channel('testCannel')
        .listen('TestEvent', (e) => {
          console.log('public channel event received',e);
          this.setState({
            isLoading: false,
            channels: [...this.state.channels, ...[e.data] ] 
        });
        }); 
      }

      activeChannels(){
        return this.state.channels.map(item =>{
          return <Channel key={item.id} item={item} handleSuccessfulJoined={this.props.handleSuccessfulJoined} />;
        });
      } 
      

      componentDidMount() {
        this._isMounted = true;
        let token =  localStorage.getItem('token');
        this.getChannels(token);
        this.listen_NewChannels();
        this.setState({isMounted: true})
      }
      componentWillUnmount() {
        this._isMounted = false;
        this.state.isMounted = false
      }
    render() {
            return (
                <div>
                     {this.state.isLoading != true ? this.activeChannels() : <div>isLoading</div>}
                </div>
            );
    }
}