import React, { Component } from 'react';
import axios from 'axios';
// import { Modal, Button } from 'react-materialize';
import { ListPlaces } from './ListPlaces';

export class Results extends Component {
	
	saveMapInfo = (id) => {
		console.log(id);
		const mapInfo = this.props.location.state.results[id];
		console.log(mapInfo);

		axios({
			method: 'post',
			url: '/mapinfo',
			data: {
				cityCoordinates: this.props.location.state.city,
				place_name: mapInfo.name,
				address: mapInfo.address,
				placeCoordinates: mapInfo.coordinates,
				image: mapInfo.image
			},
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			})

	}

	render() {
		return (
			<div>
				<table width='75%' align='center'>
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.location.state.results.map((place, index) => {
							return <ListPlaces key={place.id} place={place} index={index} saveMapInfo={this.saveMapInfo} />
						})}
					</tbody>
				</table>
			</div>
		);
	}
}