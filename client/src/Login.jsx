import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Login.css';
import video from './images/background-video.mp4';

class Login extends Component {
	goTo(route) {
		this.props.history.replace(`/${route}`)
	}

	login() {
		this.props.auth.login();
	}

	logout() {
		this.props.auth.logout();
	}

	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<div className='login-page'>
				<div className='login-container'>
					<h3>MapJourney</h3>
					<p>Interactive Travel Mapping </p>
					{/* <div className='login-intro' id='first-part'>Escape</div>
					<div className='login-intro' id='last-part'>
						<span>into amazing experiences</span>
					</div> */}
					<div className="login-buttons">
						{
							isAuthenticated() && (
								<Button
									bsStyle="primary"
									className="btn-margin"
									onClick={this.goTo.bind(this, 'search')}
								>
									Home
								</Button>
							)
						}
						{
							!isAuthenticated() && (
								<Button
									id="qsLoginBtn"
									bsStyle="primary"
									className="btn-margin"
									onClick={this.login.bind(this)}
								>
									Log In
								</Button>
							)
						}
						{
							isAuthenticated() && (
								<Button
									id="qsLogoutBtn"
									bsStyle="primary"
									className="btn-margin"
									onClick={this.logout.bind(this)}
								>
									Log Out
								</Button>
							)
						}
					</div> 
				</div>
				<video className="background-video" loop autoPlay muted>
					<source src={video} type="video/mp4" />
				</video>
			</div>
		);
	}
}

export default Login;
