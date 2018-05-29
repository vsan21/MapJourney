import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Search } from './components/Search';
import { Nav } from './components/Nav';
import { Results } from './components/Results';

class App extends Component {
  state = {
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
        let data = res.data.businesses;
        
        let places = [];
        data.forEach(item => {
          places.push({name: item.name, coordinates: item.coordinates, address: item.location.display_address, image: item.image_url});
        })

        this.setState({results: places})
        console.log(this.state.results);
    
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Nav />
        <Search handleSubmit={this.handleSubmit}/>

        <Results results={this.state.results}/> 
      </div>
    );
  }
}

export default App;
