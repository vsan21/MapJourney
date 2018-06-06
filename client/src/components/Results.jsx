import React, { Component } from 'react';
// import axios from 'axios';
import { ListPlaces } from './ListPlaces';
import './Results.css';
import { NavBar } from './NavBar';

export class Results extends Component {

	// saveMapInfo = (id) => {
	// 	const mapInfo = this.props.location.state.results[id];

	// 	axios({
	// 		method: 'post',
	// 		url: '/mapinfo',
	// 		data: {
	// 			cityCoordinates: this.props.location.state.city,
	// 			place_name: mapInfo.name,
	// 			address: mapInfo.address,
	// 			placeCoordinates: mapInfo.coordinates,
	// 			image: mapInfo.image
	// 		},
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	})
	// 		.then(res => {
	// 			console.log(res.data);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		})

	// }

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
							return <ListPlaces key={place.id} place={place} index={index} results={this.props.location.state.results} city={this.props.location.state.city}/>
						})}
					</tbody>
				</table>
			</div>
		);
	}
}