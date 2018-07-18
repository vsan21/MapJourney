const mysql = require('mysql');
require('dotenv').config();

// create MySQL connection
var connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;