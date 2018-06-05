import React, {Component} from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
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

	goTo(route) {
		this.props.history.replace(`/${route}`)
	}

	logout = () => {
		this.props.auth.logout();
	}

	render () {
		const { isAuthenticated } = this.props.auth;
		console.log(this.props.auth, this.props.history);		
		return (
			<div>
				<Navbar fluid collapseOnSelect>
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
							{/* <Button
								bsStyle="primary"
								className="btn-margin"
								onClick={this.goTo('profile')}
							>
								Your Profile
                  			</Button> */}
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
								{/* <MenuItem 
									eventKey={2.1}
									onSelect={this.goTo.bind(this, 'profile')}
								>
									Your Profile
								</MenuItem> */}
								<MenuItem divider />
								<MenuItem 
									eventKey={2.2} 
									onSelect={this.logout}
								>
									Sign out
								</MenuItem>
							</NavDropdown>
							{/* <NavItem eventKey={2}>
								Account
      						</NavItem> */}
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.places.length > 0 &&
					<Redirect to={{
						pathname: '/mymaps',
						state: { city: this.state.city, places: this.state.places }
					}} />
				}
			</div>
		);
	}
}