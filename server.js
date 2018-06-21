const express = require('express');
//for API requests
const axios = require('axios');
//to load environment variables from .env file
require('dotenv').config();
//Express Validator 
const { body, validationResult } = require('express-validator/check');
//Body Parser: allow us to grab information from POST (extract JSON out of it)
const bodyParser = require('body-parser');
//make mysql connection available to query
const connection = require('./database/connection.js');
const app = express();

//KEYS 
const YELP_API_KEY = process.env.YELP_API_KEY;

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get city coordinates to create map
app.get('/citycoords', (req, res) => {
	let id = req.query.id;
	//to set the center of the map
	connection.query('SELECT latitude, longitude FROM maps LIMIT 1', (err, results) => {
		if (err) throw err;
		res.json(results);
	})
});

//get pins information to create markers
app.get('/pins', (req, res) => {
	let id = req.query.id;
	//to create markers/infowindow on map 
	connection.query('SELECT place_name, address, map_category, latitude, longitude, image FROM pins WHERE user_id=?', id, (err, results) => {
		if (err) throw err;
		if(results.length === 0) {
			res.send('');

		} else {
			res.json(results);	
		}
	})
});

//ajax call to yelp api 
app.post('/results', (req, res) => {
	// req.checkBody('location', 'Location is Required').notEmpty();

	//req.body is the data object from axios FE
	axios.get('https://api.yelp.com/v3/businesses/search', {
		params: {
			'term': req.body.term,
			'location': req.body.location
		},
		headers: {
			'Authorization': `Bearer ${YELP_API_KEY}`
		}
	})
		.then((result) => {
			const body = result.data;
			res.send(body);
		})
		.catch((err) => {
			console.log(err);
		})
})

//sending user's "add to map" pins to db
app.post('/mapinfo', (req, res) => {
	//recall: it's req.body and not req.data 
	const user_id = req.body.user_id;
	const cityCoordinates = req.body.cityCoordinates;
	const place_name = req.body.place_name;
	const address = req.body.address;
	const placeCoordinates = req.body.placeCoordinates;
	const image = req.body.image;
	const category = req.body.category;

	//want to check if the city coordinates already exist for a user (so we don't store multiple, only once)
	connection.query('SELECT * FROM maps WHERE latitude=? AND longitude=? AND user_id=?',[cityCoordinates.latitude, cityCoordinates.longitude, user_id], (err, results, fields) => {
		if(err) throw err;
		if(results.length === 0) {
			const mapCityCoordinates = { latitude: cityCoordinates.latitude, longitude: cityCoordinates.longitude, user_id: user_id };
			connection.query('INSERT INTO maps SET ?', mapCityCoordinates, (err, results, fields) => {
				if (err) throw err;
			})
		} 
	})

	//check to see if a pin already exists in the db
	connection.query('SELECT * FROM pins WHERE latitude=? AND longitude=? AND user_id=?', [placeCoordinates.latitude, placeCoordinates.longitude, user_id], (err, results, fields) => {
		if(err) throw err;
		
		//if not, then store it into the db
		if(results.length === 0) {
			const pinsInfo = { place_name: place_name, address: address, map_category: category, latitude: placeCoordinates.latitude, longitude: placeCoordinates.longitude, image: image, user_id: user_id };
			connection.query('INSERT INTO pins SET ?', pinsInfo, (err, results, fields) => {
				if (err) throw err;
				res.send('This was stored in the database and will pinned to the map!')
			})
		} else {
			res.send('This place has already been pinned.')
		}
	})
})

app.post('/userData', (req, res) => {
	const first_name = req.body.first_name; 
	const last_name = req.body.last_name;
	const email = req.body.email;
	const date = req.body.date;

	connection.query('SELECT id, email FROM users WHERE email=?', email, (err, results) => {
		if(err) throw err;

		// if user isn't in database -> new user -> store their information
		if(results.length === 0) {
			const userData = { first_name: first_name, last_name: last_name, email: email, date: date }
			connection.query('INSERT INTO users SET ?', userData, (err, results, fields) => {
				if (err) throw err;
				connection.query('SELECT id, email FROM users WHERE email=?', email, (err, results) => {
					res.json(results[0].id);
					console.log('New user created.')
				})
			})
		//otherwise don't save their information
		} else {
			// send user's id to frontend
			res.json(results[0].id)
			console.log('User already exists.')
		}
	})
})

const host = '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, host, () => console.log(`Listening on port ${port}`));