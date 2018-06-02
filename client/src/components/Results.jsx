import React, { Component } from 'react';
import axios from 'axios';
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
import logo from '../images/yelp-logo2.png';

export class Results extends Component {
    
    saveMapInfo = (id) => {
        console.log(id);
        const mapInfo = this.props.location.state.results[id];
        console.log(mapInfo);

        // axios({
        //     method: 'POST',
        //     url: '/mapinfo',
        //     data: {
        //         cityCoordinates: this.props.location.state.city, 
        //         place_name: mapInfo.name,
        //         address: mapInfo.address,
        //         placeCoordinates: mapInfo.coordinates
        //     }, 
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //     })

    }

    render () { 
        const reviewStyle = {
            color: '#D3D3D3',
            marginBottom: '2%'
        }
        const logoStyle = {
            marginTop: '2px'
        }

        if (!this.props.location.state.results) {
            return null;
        }
        
        var listPlaces = this.props.location.state.results.map((place, index) => {
            // console.log(`Place: ${place}, Index: ${index}`)
            let placeIndex = index;
            // console.log(placeIndex, typeof placeIndex);
            let stars;
            if(place.stars === 0) {
                stars = <img src={star0} alt='0 star' width='' />
            } else if (place.stars === 1) {
                stars = <img src={star1} alt='1 star'/>     
            } else if (place.stars === 1.5) {
                stars = <img src={star1_half} alt='1.5 star'/>
            } else if (place.stars === 2) {
                stars = <img src={star2} alt='2 star'/>
            } else if (place.stars === 2.5) {
                stars = <img src={star2_half} alt='2.5 star'/>
            } else if (place.stars === 3) {
                stars = <img src={star3} alt='3 star'/>
            } else if (place.stars === 3.5) {
                stars = <img src={star3_half} alt='3.5 star'/>
            } else if (place.stars === 4) {
                stars = <img src={star4} alt='4 star'/>
            } else if (place.stars === 4.5) {
                stars = <img src={star4_half} alt='4.5 star'/>
            } else {
                stars = <img src={star5} alt='5 star'/>
            }

            return (
                <div key={place.id}>
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
                                    <img src={place.image} alt={place.name} width='230px' height='170px' />
                                </td>
                                <td width='60%' align='center'>
                                    <h3 align='left'>{place.name}</h3>
                                    <p align='left'>{place.address}</p>                                    
                                    <p align='left'>
                                        {stars} 
                                        <a href={place.yelpLink}><img src={logo} alt={logo} style={logoStyle}/></a>
                                    </p>
                                    <p align='left' style={reviewStyle}>{place.reviewCount} Reviews</p>
                                </td>
                                <td width='10%' align='center'>
                                    <button id='button' data-id={placeIndex} onClick={()=>{this.saveMapInfo(placeIndex)}}>Add to Map</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })

        return (
            <div>
                {listPlaces}
            </div> 
        );
    }
}

/*render (){
import ListItem from ''...

    const styleObj = {...}
    return (
        <table>
            {list.map(item => {
                <ListItem 
                data={item}
                key={item}
                index={i}
            })}
        </table>
    )

}*/