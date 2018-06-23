const mysql = require('mysql');
let denv = require('dotenv').config();

// console.log(denv)

//KEYS
const MYSQL_KEY = process.env.MYSQL_KEY;

// create MySQL connection
let dbConfig;

if(process.env.NODE_ENV === 'dev') {
  dbConfig = {
    host: 'localhost',
    user: 'root',
    password: `${MYSQL_KEY}`,
    database: 'mapjourneytest'
  }
} else {
    dbConfig = process.env.DATABASE_URL;
}

// console.log(process.env)
console.log(dbConfig);

var connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;