import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export class Search extends Component {
    state = {
        city: [],
        results: []
      };

      // componentDidMount() {
      //   fetch('/yelp')
      //     .then(res => {
      //       return res.json()
      //     })
      //     .then(res => {
      //       // console.log(res);
      //       this.setState({response: res.express});
      //     })
      //     .catch(error => {
      //       console.log(error)
      //     });
      // }
    
      handleSubmit = (e) => {
        //prevent form from refreshing and redirecting to '/yelp/results'
        e.preventDefault();
        // this.props.history.push('/results');
        
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
                address: item.location.display_address, 
                image: item.image_url,
                yelpLink: item.url
              });
            })
    
            this.setState({city: cityCoordinates, results: places, redirect: true});
            console.log(this.state.city, this.state.results);
        
          })
          .catch(err => console.log(err))
      }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete='off'>
                    <input type='text' name='location' placeholder='Location' />

                    <input type='text' name='term' placeholder='Activity' />
                    <button type='submit'>Search</button>
                </form>
                {this.state.results.length > 0 && 
                    <Redirect to ={{
                        pathname: '/results',
                        state: {results: this.state.results}
                    }} />
                }

            </div>       
        );
    }
}
