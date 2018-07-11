const mysql = require('mysql');
require('dotenv').config();

//KEYS
const MYSQL_KEY = process.env.MYSQL_KEY;

// create MySQL connection
let dbConfig;

//if(process.env.NODE_ENV === 'development') {
  dbConfig = {
    host: 'localhost',
    user: 'root',
    password: `${MYSQL_KEY}`,
    database: 'mapjourneytest'
  }
//} else {
//    dbConfig = process.env.DATABASE_URL;
//}

var connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;