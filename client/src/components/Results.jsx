import React, { Component } from 'react';
import axios from 'axios';
import { ListPlaces } from './ListPlaces';
import './Results.css';
import { NavBar } from './NavBar';

export class Results extends Component {
	state = {
		id: ''
	}
	componentDidMount() {
		this.saveUserData();
	}

	saveUserData = () => {
		let profile = this.props.location.state.profile;
        axios({
            method: 'post',
            url: '/userData',
            data: {
                first_name: profile.given_name,
                last_name: profile.family_name,
                email: profile.email,
                date: profile.updated_at
            },
            headers: {
                'content-type': 'application/json'
            },
        }).then(res => {
            this.setState({id: res.data})
        }).catch(err => {
            console.log(err);
        })
    }

	render() {
		return (
			<div className='wrapper'>
				<NavBar auth={this.props.auth} history={this.props.history}/>
				<table>
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.location.state.results.map((place, index) => {
							return <ListPlaces key={place.id} place={place} index={index} results={this.props.location.state.results} city={this.props.location.state.city} id={this.state.id}/>
						})}
					</tbody>
				</table>
			</div>
		);
	}
}