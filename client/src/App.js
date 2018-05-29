import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Search } from './components/Search';
import { Nav } from './components/Nav';
import { Results } from './components/Results';

class App extends Component {
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
    
    //grabbing the users's input 
    const term = e.target.term.value;
    const location = e.target.location.value;

    axios({
      method: 'post',
      url: '/yelp/results',
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
            stars: item.review_count,
            rating: item.rating,
            coordinates: item.coordinates, 
            address: item.location.display_address, 
            image: item.image_url});
        })

        this.setState({city: cityCoordinates, results: places});
        console.log(this.state.city, this.state.results);
    
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Nav />
        <Search handleSubmit={this.handleSubmit}/>
        <br />
        <Results results={this.state.results}/> 
      </div>
    );
  }
}

export default App;
