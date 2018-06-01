import React, { Component } from 'react';
import './App.css';
import { Search } from './components/Search';
// import { Nav } from './components/Nav';
import { Results } from './components/Results';
// import { Map } from './components/Map';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      
      <Router>
        <Switch>
          <Route exact path='/' component={Search}/>
          <Route exact path='/results' component={Results}/>
        </Switch>
      </Router>
    );
  }
}

export default App;

