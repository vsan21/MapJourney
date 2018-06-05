import React, { Component } from 'react';
import './App.css';
import { Search } from './components/Search';
import { Results } from './components/Results';
import  MapContainer  from './components/MapContainer';
import { Switch, Route, Router } from 'react-router-dom';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import Login from './Login';
import Home from './Home/Home';
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
          <Route path="/" render={(props) => <Login auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
					<Route exact path='/search' component={Search} />
					<Route exact path='/results' component={Results} />
					<Route exact path='/mymaps' component={MapContainer} />
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

