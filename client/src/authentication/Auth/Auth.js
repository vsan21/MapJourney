import history from '../../history';
import auth0 from 'auth0-js';
// import { AUTH_CONFIG } from './auth0-variables';

let domain;
let clientID;
let redirectUri;
let audience;

//be able to run locally or heroku local
if(process.env.NODE_ENV === 'development') {
	domain = process.env.REACT_APP_DEV_DOMAIN;
	clientID = process.env.REACT_APP_DEV_CLIENT_ID;
	redirectUri = process.env.REACT_APP_DEV_CALLBACK_URL;
	audience = `https://${process.env.REACT_APP_DEV_DOMAIN}/userinfo`;
} else {
	domain = process.env.AUTH0_DOMAIN;
	clientID = process.env.AUTH0_CLIENT_ID;
	redirectUri = process.env.AUTH0_CALLBACK_URL;
	audience = `https://${process.env.AUTH0_DOMAIN}/userinfo`;
}

console.log(`test: ${domain} ${clientID} ${redirectUri} ${audience}`);

export default class Auth {
	auth0 = new auth0.WebAuth({
		domain: domain,
		clientID: clientID,
		redirectUri: redirectUri,
		audience: audience,
		responseType: 'token id_token',
		scope: 'openid profile email'
	});

	userProfile;

	constructor() {
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.getAccessToken = this.getAccessToken.bind(this);
    	this.getProfile = this.getProfile.bind(this);
	}

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				history.replace('/search');
			} else if (err) {
				history.replace('/search');
				console.log(err);
				alert(`Error: ${err.error}. Check the console for further details.`);
			}
		});
	}

	setSession(authResult) {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
		// navigate to the home route
		history.replace('/search');
	}

	getAccessToken() {
		const accessToken = localStorage.getItem('access_token');
		if (!accessToken) {
			throw new Error('No access token found');
		}
		return accessToken;
	}

	getProfile(cb) {
		let accessToken = this.getAccessToken();
		this.auth0.client.userInfo(accessToken, (err, profile) => {
			if (profile) {
				this.userProfile = profile;
			}
			cb(err, profile);
		});
	}

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		// navigate to the home route
		history.replace('/');
	}

	isAuthenticated() {
		// Check whether the current time is past the 
		// access token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	}
}
