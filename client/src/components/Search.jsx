import React, {Component} from 'react';

export class Search extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit} autoComplete='off'>
                    <input type='text' name='location' placeholder='Location' />
                    
                    <input type='text' name='term' placeholder='Activity' />
                    <button type='submit'>Search</button>
                </form>
            </div>
        );
    }
}