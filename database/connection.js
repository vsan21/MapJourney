const mysql = require('mysql');
require('dotenv').config();

//if(process.env.NODE_ENV === 'development') {
  // dbConfig = {
  //   host: 'localhost',
  //   user: 'root',
  //   password: `${MYSQL_KEY}`,
  //   database: 'mapjourneytest'
  // }
//} else {
//    dbConfig = process.env.DATABASE_URL;
//}

// create MySQL connection
var connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');
})

module.exports = connection;