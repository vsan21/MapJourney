import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { Map } from './Map';
require('dotenv').config();

export class MapContainer extends Component {
	render() {
		return (
			<div>
			<h1>Your Map</h1>
			{/* passing the Google Maps props down to child so it has access */}
			<Map google={this.props.google}/>
			</div>
		);
	}
}

//Wrapping the MapContainer component inside the GoogleApiWrapper and exporting it together
	//GoogleApiWrapper gives us a prop (google object)
export default GoogleApiWrapper({
	apiKey:`${process.env.GOOGLE_API_KEY}`
})(MapContainer)