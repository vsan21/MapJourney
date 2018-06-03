const express = require('express');
//for API requests
const axios = require('axios');
//to load environment variables from .env file
require('dotenv').config();
//Express Validator 
const { body,validationResult } = require('express-validator/check');
//Body Parser: allow us to grab information from POST (extract JSON out of it)
const bodyParser = require('body-parser');
//make mysql connection available to query
const connection = require('./database/connection.js');
const app = express();

//KEYS 
const YELP_API_KEY = process.env.YELP_API_KEY;

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//get map/pins information to create map/markers
app.get('/mymaps', (req, res) => {
  //to set the center of the map
  connection.query('SELECT (latitude, longitude) FROM maps', (err, results) => {
    if (err) throw err;
  })

  //to create markers/infowindow on map 
  connection.query('SELECT (place_name, address, map_category, latitude, longitude, image) FROM pins', (err, results) => {
    if (err) throw err;
  })

  res.send();
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
  const cityCoordinates = req.body.cityCoordinates;
  const place_name = req.body.place_name;
  const address = req.body.address;
  const placeCoordinates = req.body.placeCoordinates;
  const image = req.body.image;

  const mapCityCoordinates = {latitude: cityCoordinates.latitude, longitude: cityCoordinates.longitude};
  connection.query('INSERT INTO maps SET ?', mapCityCoordinates, (err, results, fields) => {
    if (err) throw err;
  })

  const pinsInfo = {place_name: place_name, address: address, latitude: placeCoordinates.latitude, longitude: placeCoordinates.longitude, image: image};
  connection.query('INSERT INTO pins SET ?', pinsInfo, (err, results, fields) => {
    if (err) throw err;
  })

  res.send('This was stored in the database and will pinned to the map!')
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));