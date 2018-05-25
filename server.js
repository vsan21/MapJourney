const express = require('express');
//for API requests
const axios = require('axios');
//to load environment variables from .env file
require('dotenv').config();
const mysql = require('mysql');
//Express Validator 
const { body,validationResult } = require('express-validator/check');
//Body Parser: allow us to grab information from POST (extract JSON out of it)
const bodyParser = require('body-parser');
const app = express();
// const postData = require('./client/src/App.js');

//KEYS 
const YELP_API_KEY = process.env.YELP_API_KEY;
const MYSQL_KEY = process.env.MYSQL_KEY;

//To enable CORS in server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

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

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/yelp', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/yelp/results', (req, res) => {
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
      const body = result.data.businesses;
      res.json(body);

    })
    .catch((err) => {
      console.log(err);
    }) 
  
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));