import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { Map } from './Map';
import { NavBar } from './NavBar';

let GOOGLE_API_KEY;
if(process.env.NODE_ENV === 'development') {
	GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_DEV_API_KEY;
} else {
	GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_PROD_API_KEY;
}

export class MapContainer extends Component {
	render() {
		return (
			<div>
				<NavBar auth={this.props.auth} history={this.props.history} id={this.props.location.state.id}/>
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
	apiKey: GOOGLE_API_KEY
})(MapContainer)

