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

//create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: `${MYSQL_KEY}`,
  database: 'test'
})

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');

  var person = {name: 'Larry', age: 41, email: 'larrybird@gmail.com'};
  connection.query('INSERT INTO people SET ?', person, (err, results, fields) => {
    if(err) throw err; 
  })
})

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/yelp', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/yelp/results', (req, res) => {
  // req.checkBody('location', 'Location is Required').notEmpty();
  console.log(req.body);
  let location = req.body.location;
  let term = req.body.term;

  axios.get('https://api.yelp.com/v3/businesses/search', {
    params: {
      'term': `${term}`,
      'location': `${location}`
    },
    headers: {
      'Authorization': `Bearer ${YELP_API_KEY}`
    }
  })
    .then((result) => {
      const body = result.data;
      console.log(body);

      // console.log(JSON.parse(JSON.stringify(body)));
      // res.send(body);
      // res.json({express: body})
    })
    .catch((err) => {
      console.log(err);
    }) 
  
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));