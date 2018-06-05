import React, { Component } from 'react';
import './App.css';
import { Search } from './components/Search';
import { Results } from './components/Results';
// import { NavBar } from './components/NavBar';
import  MapContainer  from './components/MapContainer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';


class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/' component={Search} />
					<Route exact path='/results' component={Results} />
					<Route exact path='/mymaps' component={MapContainer} />
				</Switch>
			</Router>
		);
	}
}

export default App;

