import React, { Component } from 'react'

export default class Online extends Component {
    constructor(){
        super();
        this.state ={
            history: [{
                squares: Array(9).fill(null)
                }],
            status: 'create',
        }
       }





    render() {
        return (
            <div>
                Online game;
            </div>
        )
    }
}
