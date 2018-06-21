const mysql = require('mysql');
require('dotenv').config();

//KEYS
const MYSQL_KEY = process.env.MYSQL_KEY;

// create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;