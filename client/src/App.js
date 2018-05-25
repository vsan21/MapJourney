import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {Search} from './components/Search';

class App extends Component {
  state = {
    response: '',
    term: '',
    location: ''
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
        let results = res.data;
        console.log(res.data);

        let resultOutput = "<ul class='list-group'>";
        results.forEach((business) => {
          resultOutput += `<li>${business.name}</li>`
        })
        resultOutput += "</ul>";

        document.getElementById('result-output').innerHTML = resultOutput;
      })
      .catch(err => console.log(err))
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>

        <Search handleSubmit={this.handleSubmit}/>
        <div id='result-output'></div>

      </div>
    );
  }
}

export default App;
