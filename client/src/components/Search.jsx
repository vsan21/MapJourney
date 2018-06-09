import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import './Search.css';
import { NavBar } from './NavBar';
// import video from '../images/background-video.mp4';

export class Search extends Component {
	state = {
		city: '',
		results: [],
		profile: {},
		id: ''
	};

	componentWillMount() {
        const { userProfile, getProfile } = this.props.auth;
        //if there is already not a userProfile, then getProfile
            //pass that profile info to saveUserData so it can send it to the backend
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
                this.saveUserData(profile);           
            });
        } else {
            this.setState({ profile: userProfile });
        }
	}
	
	saveUserData = (profile) => {
        axios({
            method: 'post',
            url: '/userData',
            data: {
                first_name: profile.given_name,
                last_name: profile.family_name,
                email: profile.email,
                date: profile.updated_at
            },
            headers: {
                'content-type': 'application/json'
            },
        }).then(res => {
            this.setState({id: res.data})
        }).catch(err => {
            console.log(err);
        })
    }

	handleSubmit = (e) => {
		//prevent form from refreshing and redirecting to '/results'
		e.preventDefault();

		//grabbing the users's input 
		const term = e.target.term.value;
		const location = e.target.location.value;

		axios({
			method: 'post',
			url: '/results',
			data: {
				location: location,
				term: term
			},
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				console.log(res.data);
				//grabbing the city's coordinates to be used for google maps "center" required option
				let cityCoordinates = res.data.region.center;
				let data = res.data.businesses;
				console.log(data);

				let places = [];
				data.forEach(item => {
					places.push({
						id: item.id,
						name: item.name,
						reviewCount: item.review_count,
						stars: item.rating,
						coordinates: item.coordinates,
						address: item.location.display_address[0] + ', ' + item.location.display_address[1],
						image: item.image_url,
						yelpLink: item.url
					});
				})

				this.setState({ city: cityCoordinates, results: places, redirect: true });
				console.log(this.state.city, this.state.results);

			})
			.catch(err => console.log(err))
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		console.log(`Search id: ${this.state.id}`)
		return (
			<div>
				<NavBar auth={this.props.auth} history={this.props.history} id={this.state.id} />
				<div className='cover'>
					<div className='welcome'>
						{
							isAuthenticated() && (
							<h4>
								Where is your next adventure?
							</h4>
							)
						}
					</div>
					<form onSubmit={this.handleSubmit} autoComplete='off' className='flex-form'>
						<input type='text' name='term' placeholder='Ex. Hikes, Museums...' />
						<input type='text' name='location' placeholder='Ex. San Francisco, CA' />
						<button type='submit'>Search</button>
					</form>

					{/* redirecting the results to a new page */}
					{this.state.results.length > 0 &&
						<Redirect to={{
							pathname: '/results',
							state: { city: this.state.city, results: this.state.results, id: this.state.id }
						}} />
					}

				</div>
			</div>
		);
	}
}