import React, { Component } from 'react';
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
import logo from '../images/yelp-logo.png';


export class Results extends Component {
    render () { 
        const reviewStyle = {
            color: '#D3D3D3',
            marginBottom: '2%'
        }
        const logoStyle = {
            marginTop: '2px'
        }

        if (!this.props.results) {
            return;
        }
        
        var listItems = this.props.results.map(item => {
            let stars;
            if(item.stars === 0) {
                stars = <img src={star0} alt='0 star' width='' />
            } else if (item.stars === 1) {
                stars = <img src={star1} alt='1 star'/>     
            } else if (item.stars === 1.5) {
                stars = <img src={star1_half} alt='1.5 star'/>
            } else if (item.stars === 2) {
                stars = <img src={star2} alt='2 star'/>
            } else if (item.stars === 2.5) {
                stars = <img src={star2_half} alt='2.5 star'/>
            } else if (item.stars === 3) {
                stars = <img src={star3} alt='3 star'/>
            } else if (item.stars === 3.5) {
                stars = <img src={star3_half} alt='3.5 star'/>
            } else if (item.stars === 4) {
                stars = <img src={star4} alt='4 star'/>
            } else if (item.stars === 4.5) {
                stars = <img src={star4_half} alt='4.5 star'/>
            } else {
                stars = <img src={star5} alt='5 star'/>
            }

            return (
                <div key={item.id}>
                    <table width='75%' align='center'>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width='10%' align='center'>
                                    <img src={item.image} alt='{item.name}' width='150px' height='110px' />
                                </td>
                                <td width='60%' align='center'>
                                    <h3 align='left'>{item.name}</h3>
                                    <p align='left'>
                                        {stars} 
                                        <a href={item.yelpLink}><img src={logo} alt={logo} style={logoStyle}/></a>
                                    </p>
                                    <p align='left' style={reviewStyle}>{item.reviewCount} Reviews</p>
                                    <p align='left'>{(item.address[0]) + ', ' + (item.address[1])}</p>
                                </td>
                                <td width='10%' align='center'>
                                    <button>Add to Map</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )

        })

        return (
            <div>
                {listItems}
            </div>
        );
    }
}