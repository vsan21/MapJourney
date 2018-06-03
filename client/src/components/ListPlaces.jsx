import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
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

export class ListPlaces extends Component {
    state = {
        show: false
    }

    handleClose = () => {
        this.setState({ show: false });
        let category = document.querySelector('input[name="category"]:checked').value;
        console.log(category);
        //grab what the user selected from the radio list
            
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        const reviewStyle = {
			color: '#D3D3D3',
			marginBottom: '2%'
		}
		const logoStyle = {
			marginTop: '2px'
        }

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
                <td width='10%' align='center'>
                    <img src={place.image} alt={place.name} width='230px' height='170px' />
                </td>
                <td width='60%' align='center'>
                    <h3 align='left'>{place.name}</h3>
                    <p align='left'>{place.address}</p>
                    <p align='left'>
                        {stars}
                        <a href={place.yelpLink}><img src={logo} alt={logo} style={logoStyle} /></a>
                    </p>
                    <p align='left' style={reviewStyle}>{place.reviewCount} Reviews</p>
                </td>
                <td width='10%' align='center'>
                    <Button 
                        bsStyle="primary" bsSize="small" 
                        id='button' data-id={index} onClick={() => { 
                            this.props.saveMapInfo(index);
                            this.handleShow()                             
                        }}
                    >
                        Add to Map
                    </Button>
                    <Modal bsSize='small' show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header>
                            <Modal.Title>Map Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Which category does this item belong to?</h4>
                            <form>
                                <input type='radio' name='category' value='museum'/> Museum<br/>
                                <input type='radio' name='category' value='restaurant'/> Restaurant<br/>
                                <input type='radio' name='category' value='dessert'/> Dessert<br/>
                                <input type='radio' name='category' value='bar'/> Bar<br/> 
                                <input type='radio' name='category' value='hike'/> Hike<br/>
                                <input type='radio' name='category' value='photo-op'/> Photo-op<br/>
                                <input type='radio' name='category' value='romantic'/> Romantic<br/> 
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Save</Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        );
    }
}