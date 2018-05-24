import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

  //       // let resultOutput = "<ul class='list-group'>";
  //       // for(let business of res){
  //       //   resultOutput += `<li class='list-group-item'>${business.name}</li>`;
  //       // }
  //       // resultOutput += "</ul>";

  //       // document.getElementById('result-output').innerHTML = resultOutput;
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // }

  handleSubmit = (e) => {
    //prevent form from refreshing and redirecting to '/yelp/results'
    e.preventDefault();
    // const data = new FormData(e.target);
    // console.log(e.target);
    // console.log(data);

    //this fetches 
    fetch('/yelp/results', {
      method: 'POST',
      body: {location: 'san francisco', term: 'crepes'}
    })
      // turns readableStream into json 
      .then(res => res.json())
      .then(res => console.log(res))
    
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>

        <form onSubmit={this.handleSubmit}>
          <input type='text' name='location' placeholder='Location' />
          <input type='text' name='term' placeholder='Activity' />
          <button type='submit'>Search</button>
        </form>

        <div id='result-output'></div>

      </div>
    );
  }
}

export default App;
