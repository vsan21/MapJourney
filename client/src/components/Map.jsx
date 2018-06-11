import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Bar from '../images/icons/bar.svg';
import Cafe from '../images/icons/cafe.svg';
import Garden from '../images/icons/garden.svg';
import Hike from '../images/icons/hike.svg';
import Dessert from '../images/icons/dessert.svg';
import Museum from '../images/icons/museum.svg';
import PhotoOp from '../images/icons/photoop.svg';
import Restaurant from '../images/icons/restaurant.svg';
import Romantic from '../images/icons/romantic.svg';
import './Map.css';

export class Map extends Component {
	state = {
		mapWidth: '100vw',
		panelWidth: '0vw',
		panelDisplay: 'none',
		map: '',
		geocoder: ''
	}

	// when component mounts, invoke loadMap function
	componentDidMount() {
		this.loadMap();
	}

	loadMap = () => {
		//normal style
		//takes off default poi & transit markers
		const styles = [
			{
				featureType: "poi",
				elementType: "labels",
				stylers: [{ visibility: "off" }]
			},
			{
				featureType: 'transit',
				elementType: 'all',
				stylers: [{ visibility: 'off' }]
			}
		];

		const icons = {
			'museum': Museum,
			'restaurant': Restaurant,
			'dessert': Dessert,
			'hike': Hike,
			'photo-op': PhotoOp,
			'romantic': Romantic,
			'bar': Bar,
			'cafe': Cafe,
			'garden': Garden
		}

		//checking to see if props were passed down from parent {MapContainer}
		//this.props = google object (contains the map object)
		//this.props.google = maps object (contains all the map info)
		if (this.props && this.props.google) {
			const { google } = this.props;
			//google.maps (or this.props.google.maps) = map object
			const maps = google.maps;

			// Here we define both so that we can use it later to create new Markers, InfoWindows, etc. (i.e. google.maps.Marker)

			//Looks for the HTML div where ref='map'
			const mapRef = this.refs.map;
			//Finds that exact div in the React DOM
			const node = ReactDOM.findDOMNode(mapRef);
			
			const city = this.props.city[0].coordinates;
			//map options/configurations (zoom + center)
			const mapConfig = Object.assign({}, {
				center: { lat: city.latitude, lng: city.longitude },
				zoom: 11,
				styles: styles 
			})

			//creating a new Map (var map = new google.maps.Map(document.getElementById('map'), options)
			this.map = new maps.Map(node, mapConfig);

			//so that the map and geocoder can be accessed anywhere
			this.setState({map: this.map, geocoder: new google.maps.Geocoder()})

			//custom control ('Get Directions'); puts it at the TOP_CENTER of the map
            const centerControlDiv = document.getElementById('control-div');
            centerControlDiv.index = 1;
            this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

            const directionsDisplay = new google.maps.DirectionsRenderer;
            const directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(this.map);

			//ADD MARKER
			//iterate through each location in state (for each, create a marker). Takes 'position' and 'map'
			this.props.places.forEach(place => {
				const marker = new google.maps.Marker({
					position: { lat: place.coordinate.lat, lng: place.coordinate.lng },
					//this.map is referencing the map we created above 
					map: this.map
				})

				//ADD CUSTOM ICON
				if (place.category in icons) {
					marker.setIcon(icons[place.category]);
				} 

				//ADD INFOWINDOW
				if (place.content) {
					const infoWindow = new google.maps.InfoWindow({
						content: place.content
					})

					//when user clicks on any of the markers, open infowindow
					//2 parameters: the map where it will open, and the marker
					marker.addListener('click', () => {
						infoWindow.open(this.map, marker);
					})
				}
			})
		}
	}

	//opens the right panel (for directions)
    loadDirectionsPanel = () => {
		this.setState({mapWidth: '65vw', panelWidth: '35vw', panelDisplay: 'flex'})
	}
    
    //geocode -> converts address into coordinates (also makes marker)
    geocodeAddress = (e) => {
        e.preventDefault();
        const address = e.target.address.value;
        console.log(address);

        this.state.geocoder.geocode( {'address': address}, (results, status) => {
            if (status === 'OK') {
                const hotelCoords = results[0].geometry.location;
                console.log(hotelCoords);
                console.log(results[0].formatted_address);

                this.state.map.setCenter(hotelCoords);
                const marker = new this.props.google.maps.Marker({
                    position: hotelCoords,
                    map: this.state.map
                })
            } else {
                alert('Geocode was not successful for the following reasons: ' + status);
            }
        })
    }

	render() {
		//NEEDED in order for map to display 
		// const style = {
		// 	width: '100vw',
		// 	height: '100vh'
		// }

		const mapStyle = {
			width: this.state.mapWidth,
			height: '90vh',
			border: '2px solid yellow'
		}

		const rightPanel = {
			width: this.state.panelWidth,
			border: '2px solid orange',
			display: this.state.panelDisplay
		}
		
		return (	
			

			<div>
				{/* attaching the map styles */}
				<div className="app">
					<div ref='map' className='map' style={mapStyle}>
						loading map...
					</div>

					<div id="control-div">
						<div id="controlUI" onClick={this.loadDirectionsPanel}>
							<div id="controlText">
								Get Directions
							</div>
						</div>
					</div>

					<div id='right-panel' style={rightPanel}>
						<form onSubmit={this.geocodeAddress} className='address-form'>
							<label htmlFor="address"><strong>Your Hotel Address: </strong></label>
							<input type="text" name="address" />
							<button id='hotelbtn'>Submit</button>
						</form>
					</div>

				</div>
			</div>
		);
	}
}