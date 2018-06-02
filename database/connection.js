const mysql = require('mysql');

//KEYS
const MYSQL_KEY = process.env.MYSQL_KEY;

// create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: `${MYSQL_KEY}`,
  database: 'mapjourneytest'
})

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;