import React, { Component } from 'react';

export class Results extends Component {
    render () {
        if (!this.props.results) {
            return;
        }
        var listItems = this.props.results.map(item => {
            return (
                <div key={item.id}>
                    
                    <img src={item.image} alt='{item.name}' width='50px' height='50px' />
                    <h3>{item.name}</h3>
                    <p>{(item.address[0]) + ', ' + (item.address[1])}</p>
                    <button>Add</button>
                </div>
            )

        })

        return (
            <div>
                {listItems}
            </div>
        );
    }
}