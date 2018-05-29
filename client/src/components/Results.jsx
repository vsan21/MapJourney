import React, { Component } from 'react';

export class Results extends Component {
    render () {
        this.props.results.forEach(item => {
            console.log(item);
        })
        return (
            <div>
                
            </div>
        );
    }
}