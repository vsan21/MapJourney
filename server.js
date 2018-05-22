//for API requests
const axios = require('axios');
//to load environment variables from .env file
require('dotenv').config();
const mysql = require('mysql');
const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

//KEYS 
const YELP_API_KEY = process.env.YELP_API_KEY;
const MYSQL_KEY = process.env.MYSQL_KEY;

//create MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: `${MYSQL_KEY}`,
//   database: 'test'
// })

// connection.connect((err) => {
//   if(err) throw err;
//   console.log('You are now connected to the database...');

//   var person = {name: 'Larry', age: 41, email: 'larrybird@gmail.com'};
//   connection.query('INSERT INTO people SET ?', person, (err, results, fields) => {
//     if(err) throw err; 
//   })
// })

app.get('/yelp', (req, res) => {
  // res.send({ express: 'Hello From Express' });
  console.log(`term: ${req.query.term}, location: ${req.query.location}`);
  // axios.get('https://api.yelp.com/v3/businesses/search', {
  //   params: {
  //     'term': 'genki', 
  //     'location': 'san%20francisco,%20ca'
  //   },
  //   headers: {
  //     'Authorization': `Bearer ${YELP_API_KEY}`
  //   }
  // })
  //   .then((result) => {
  //     const body = result.data.businesses;
  //     res.send(body)
  // })
  //   .catch((err) => {
  //   console.log(err);
  // })
});

app.listen(port, () => console.log(`Listening on port ${port}`));