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
        // console.log(res);
        this.setState({response: res.express});

        // let resultOutput = "<ul class='list-group'>";
        // for(let business of res){
        //   resultOutput += `<li class='list-group-item'>${business.name}</li>`;
        // }
        // resultOutput += "</ul>";

        // document.getElementById('result-output').innerHTML = resultOutput;
      })
      .catch(error => {
        console.log(error)
      });

    // fetch('/api/hello')
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>

        <form method='POST' action='/api/hello'>
          <input type='text' name='location' placeholder='Location' />
          <button type='submit'>Search</button>
        </form>
        <div id='result-output'></div>

      </div>
    );
  }
}

export default App;
