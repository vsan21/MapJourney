const mysql = require('mysql');
require('dotenv').config();

//KEYS
const MYSQL_KEY = process.env.MYSQL_KEY;

// create MySQL connection
let dbConfig;

if(process.env.PORT === undefined) {
  dbConfig = {
    host: 'localhost',
    user: 'root',
    password: `${MYSQL_KEY}`,
    database: 'mapjourneytest'
  }
} else {
    dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
  }
}

const connection = mysql.createConnection(CLEARDB_DATABASE_URL)

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;