import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import './App.css';
import { Search } from './components/Search';
import { Results } from './components/Results';
import  MapContainer  from './components/MapContainer';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import Login from './Login';
import Profile from './Profile/Profile';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
	if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication();
	}
}

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route exact path="/" render={(props) => <Login auth={auth} {...props} />} />
					<Route exact path="/search" render={(props) => <Search auth={auth} {...props} />} />
					<Route exact path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
					<Route exact path='/results' render={(props) => <Results auth={auth} {...props} />} />
					<Route exact path='/mymaps' render={(props) => <MapContainer auth={auth} {...props} />} />
					<Route path="/callback" render={(props) => {
						handleAuthentication(props);
						return <Callback {...props} /> 
					}}/> 
				</Switch>
			</Router>
		);
	}
}

export default App;

