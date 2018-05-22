import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };
  
  componentDidMount() {
    fetch('/yelp')
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res);

        let resultOutput = "<ul class='list-group'>";
        for(let business of res){
          resultOutput += `<li class='list-group-item'>${business.name}</li>`;
        }
        resultOutput += "</ul>";

        document.getElementById('result-output').innerHTML = resultOutput;
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <div id='result-output'></div>
      </div>
    );
  }
}

export default App;
