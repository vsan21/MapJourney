const mysql = require('mysql');
require('dotenv').config();

//KEYS
const MYSQL_KEY = process.env.MYSQL_KEY;

// create MySQL connection
let dbConfig;

if(process.env.NODE_ENV === 'development') {
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
} else {
  dbConfig = {
    host: 'localhost',
    user: 'root',
    password: `${MYSQL_KEY}`,
    database: 'mapjourneytest'
  }
}

const connection = mysql.createConnection(dbConfig)

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;