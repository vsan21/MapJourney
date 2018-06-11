import React, {Component} from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';
import './NavBar.css';

export class NavBar extends Component {
	//state holds the marker locations (array of individual objects)
	state = {
		city: [],
		places: [],
		id: this.props.id, 
		icon: ''
	}

	getCityCoords = (id) => {
	    axios({
	        method: 'get',
			url: '/citycoords',
			params: {
				id: id
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

	getPins = (id) => {
		axios({
	        method: 'get',
			url: '/pins',
			params: {
				id: id
			},
	        headers: {
	            'content-type': 'application/json'
	        }
	    })
	        .then(res => {
				if(res.data === '') {
					alert('You currently have no maps.');
				} else {
					let places = [];
					res.data.forEach(place => {
						places.push({
							coordinate: { lat: place.latitude, lng: place.longitude },
							category: place.map_category,
							content: `
							<div id='content'>
								<h2>${place.place_name}</h2>
								<p><strong>Address</strong>: ${place.address}</p>
								<div id='place_image'>
									<img src=${place.image} alt=${place.place_name} width='150px' height='150px'/>
								</div>
							</div>
						`
						})
					})
					this.setState({ places: places })
				}
	        })
	        .catch(err => {
	            console.log(err);
	        })
	}

	goTo(route) {
		console.log(`id before: ${this.props.id}`)
		this.props.history.replace({
			pathname: `/${route}`, 
			state: {id: this.props.id}
		})
	}

	login() {
		this.props.auth.login();
	}

	logout() {
		this.props.auth.logout();
	}

	render () {
		console.log(`Navbar id: ${this.props.id}`);
		const { isAuthenticated } = this.props.auth;

		return (
			<div>
				<Navbar fluid collapseOnSelect id='navbar'>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/search">MapJourney</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>


						<Nav pullRight>
							{
								isAuthenticated() && (
									<NavItem eventKey={1} onClick={() => {
										this.getCityCoords(this.props.id);
										this.getPins(this.props.id)
									}}>
										My Maps
									  </NavItem>
								)
							}
							<NavDropdown eventKey={2} title="Account" id="basic-nav-dropdown">
								{
									isAuthenticated() && (
										<MenuItem
											eventKey={2.1}
											onSelect={this.goTo.bind(this, 'profile')}
										>
											Your Profile
										</MenuItem>
									)
								}
								{
									!isAuthenticated() && (
										<MenuItem
											eventKey={2.2}
											onSelect={this.login.bind(this)}
										>
											Log In
										</MenuItem>
									)
								}
								<MenuItem divider />
								{
									isAuthenticated() && (
										<MenuItem
											eventKey={2.3}
											onSelect={this.logout.bind(this)}
										>
											Sign out
										</MenuItem>
									)
								}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.places.length > 0 &&
					<Redirect to={{
						pathname: '/mymaps',
						state: { city: this.state.city, places: this.state.places, id: this.state.id}
					}} />
				}
			</div>
		);
	}
}