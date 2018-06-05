import React, {Component} from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';

export class NavBar extends Component {
	//state holds the marker locations (array of individual objects)
	state = {
		city: [],
		places: []
	}

	getCityCoords = () => {
	    axios({
	        method: 'get',
	        url: '/citycoords',
	        data: {

	        },
	        headers: {
	            'content-type': 'application/json'
	        }
	    })
	        .then(res => {
				let city = [];
				city.push({coordinates: res.data[0]})

				this.setState({city: city});
	        })
	        .catch(err => {
	            console.log(err);
	        })
	}

	getPins = () => {
		axios({
	        method: 'get',
	        url: '/pins',
	        data: {

	        },
	        headers: {
	            'content-type': 'application/json'
	        }
	    })
	        .then(res => {
				let places = [];
				res.data.forEach(place => {
					places.push({
						coordinate: { lat: place.latitude, lng: place.longitude },
						iconImage: '',
						category: '',
						content: `
							<img src=${place.image} alt=${place.place_name} width='100px' height='100px'/>
							<h1>${place.place_name}</h1>
							<p>Address: ${place.address}</p>
						`
					})
				})
				this.setState({places: places})
	        })
	        .catch(err => {
	            console.log(err);
	        })
	}

	render () {
		return (
			<div>
				<Navbar default collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/search">MapJourney</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1} onClick={() => {
								this.getCityCoords(); 
								this.getPins() 
							}}>
								My Maps
      						</NavItem>
							<NavItem eventKey={2}>
								Account
      						</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.places.length > 0 &&
					// <MapContainer city={this.state.city} places={this.state.places} />

					<Redirect to={{
						pathname: '/mymaps',
						state: { city: this.state.city, places: this.state.places }
					}} />
				}

			</div>
		);
	}
}