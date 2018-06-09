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

export class Map extends Component {
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

		//retro style
		// const styles = [
		// 	{ elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
		// 	{ elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
		// 	{ elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
		// 	{
		// 		featureType: 'administrative',
		// 		elementType: 'geometry.stroke',
		// 		stylers: [{ color: '#c9b2a6' }]
		// 	},
		// 	{
		// 		featureType: 'administrative.land_parcel',
		// 		elementType: 'geometry.stroke',
		// 		stylers: [{ color: '#dcd2be' }]
		// 	},
		// 	{
		// 		featureType: 'administrative.land_parcel',
		// 		elementType: 'labels.text.fill',
		// 		stylers: [{ color: '#ae9e90' }]
		// 	},
		// 	{
		// 		featureType: 'landscape.natural',
		// 		elementType: 'geometry',
		// 		stylers: [{ color: '#dfd2ae' }]
		// 	},
		// 	{
		// 		featureType: "poi",
		// 		elementType: "labels",
		// 		stylers: [{ visibility: "off" }]
		// 	},
		// 	{
		// 		featureType: 'road',
		// 		elementType: 'geometry',
		// 		stylers: [{ color: '#f5f1e6' }]
		// 	},
		// 	{
		// 		featureType: 'road.arterial',
		// 		elementType: 'geometry',
		// 		stylers: [{ color: '#fdfcf8' }]
		// 	},
		// 	{
		// 		featureType: 'road.highway',
		// 		elementType: 'geometry',
		// 		stylers: [{ color: '#f8c967' }]
		// 	},
		// 	{
		// 		featureType: 'road.highway',
		// 		elementType: 'geometry.stroke',
		// 		stylers: [{ color: '#e9bc62' }]
		// 	},
		// 	{
		// 		featureType: 'road.highway.controlled_access',
		// 		elementType: 'geometry',
		// 		stylers: [{ color: '#e98d58' }]
		// 	},
		// 	{
		// 		featureType: 'road.highway.controlled_access',
		// 		elementType: 'geometry.stroke',
		// 		stylers: [{ color: '#db8555' }]
		// 	},
		// 	{
		// 		featureType: 'road.local',
		// 		elementType: 'labels.text.fill',
		// 		stylers: [{ color: '#806b63' }]
		// 	},
		// 	{
		// 		featureType: 'transit',
		// 		elementType: 'all',
		// 		stylers: [{ visibility: 'off' }]
		// 	},
		// 	{
		// 		featureType: 'water',
		// 		elementType: 'geometry.fill',
		// 		stylers: [{ color: '#b9d3c2' }]
		// 	},
		// 	{
		// 		featureType: 'water',
		// 		elementType: 'labels.text.fill',
		// 		stylers: [{ color: '#92998d' }]
		// 	}
		// ];

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

				// if ({icon}) {
				// 	marker.setIcon({icon});
				// }

				//checking category, to get the right icon
				// if (place.category === '') {
				// 	place.iconImage = '';
				// 	marker.setIcon(place.iconImage);
				// }

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


	render() {
		//NEEDED in order for map to display 
		const style = {
			width: '100vw',
			height: '100vh'
		}
		return (	
			<div ref='map' style={style}>
				loading map...
			</div>
		);
	}
}