import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import logo from '../images/yelp-logo2.png';
import star0 from '../images/small_0@3x.png';
import star1 from '../images/small_1@3x.png';
import star1_half from '../images/small_1_half@3x.png';
import star2 from '../images/small_2@3x.png';
import star2_half from '../images/small_2_half@3x.png';
import star3 from '../images/small_3@3x.png';
import star3_half from '../images/small_3_half@3x.png';
import star4 from '../images/small_4@3x.png';
import star4_half from '../images/small_4_half@3x.png';
import star5 from '../images/small_5@3x.png';
import './ListPlaces.css';

export class ListPlaces extends Component {
	state = {
		show: false
	}

	handleShow = () => {
		this.setState({ show: true });
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	saveMapInfo = (id) => {
		//grabbing the specific data associated with each button
		const mapInfo = this.props.results[id];
		console.log(mapInfo);

		let map_category;
		let checkCategory = document.querySelector('input[name="category"]:checked');
		//checking to see if user selected any category or not
		if (checkCategory === null) {
			return;
		} else {
			map_category = checkCategory.value;
		}

		axios({
			method: 'post',
			url: '/mapinfo',
			data: {
				cityCoordinates: this.props.city,
				place_name: mapInfo.name,
				address: mapInfo.address,
				placeCoordinates: mapInfo.coordinates,
				image: mapInfo.image,
				category: map_category
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
		const place = this.props.place;
		const index = this.props.index;

		let stars;
		if (place.stars === 0) {
			stars = <img src={star0} alt='0 star' width='' />
		} else if (place.stars === 1) {
			stars = <img src={star1} alt='1 star' />
		} else if (place.stars === 1.5) {
			stars = <img src={star1_half} alt='1.5 star' />
		} else if (place.stars === 2) {
			stars = <img src={star2} alt='2 star' />
		} else if (place.stars === 2.5) {
			stars = <img src={star2_half} alt='2.5 star' />
		} else if (place.stars === 3) {
			stars = <img src={star3} alt='3 star' />
		} else if (place.stars === 3.5) {
			stars = <img src={star3_half} alt='3.5 star' />
		} else if (place.stars === 4) {
			stars = <img src={star4} alt='4 star' />
		} else if (place.stars === 4.5) {
			stars = <img src={star4_half} alt='4.5 star' />
		} else {
			stars = <img src={star5} alt='5 star' />
		}

		return (
			<tr>
				<td>			
					<div className="image">
						<img src={place.image} alt={place.name} width='200px' height='200px' />
					</div>							
				</td>
				<td>
					<div className="description">
						<p>{place.name}</p>
						<p>{place.address}</p>
						<p>
							{stars}
							<a href={place.yelpLink}><img src={logo} alt={logo} /></a>
						</p>
						<p><i>{place.reviewCount} Reviews</i></p>
					</div>
				</td>
				<td>
					<Button
						bsStyle="primary" bsSize="large"
						id='addbtn' data-id={index} onClick={this.handleShow}
					>
						Add to Map
					</Button>
					<Modal bsSize='small' backdrop='static' keyboard={false} show={this.state.show} >
						<Modal.Header id='modal-header'>
							<Modal.Title id='modal-title'>Map Category</Modal.Title>
						</Modal.Header>
						<Modal.Body id='modal-body'>
							<h4>Select a category:</h4>
							<form>
								<input type='radio' name='category' value='museum' /> Museum<br />
								<input type='radio' name='category' value='restaurant' /> Restaurant<br />
								<input type='radio' name='category' value='dessert' /> Dessert<br />
								<input type='radio' name='category' value='bar' /> Bar<br />
								<input type='radio' name='category' value='hike' /> Hike<br />
								<input type='radio' name='category' value='photo-op' /> Photo-op<br />
								<input type='radio' name='category' value='romantic' /> Romantic<br />
							</form>
						</Modal.Body>
						<Modal.Footer>
							<Button id='savebtn' onClick={() => {
								this.handleClose();
								//saving the index for each place until you click on it
								this.saveMapInfo(index);
								}}
							>
								Save
							</Button>
						</Modal.Footer>
					</Modal>
				</td>
			</tr>
		);
	}
}