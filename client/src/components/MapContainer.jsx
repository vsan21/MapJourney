import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { Map } from './Map';
import { NavBar } from './NavBar';

export class MapContainer extends Component {
	render() {
		return (
			<div>
				<NavBar />
				{/* passing the Google Maps props down to child so it has access */}
				<Map 
					google={this.props.google} 
					city={this.props.location.state.city} 
					places={this.props.location.state.places} 
				/>
			</div>
		);
	}
}

//Wrapping the MapContainer component inside the GoogleApiWrapper and exporting it together
	//GoogleApiWrapper gives us a prop (google object)
export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)

