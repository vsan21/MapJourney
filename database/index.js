const mysql = require('mysql');

//KEYS
const MYSQL_KEY = process.env.MYSQL_KEY;

// create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: `${MYSQL_KEY}`,
  database: 'test'
})

connection.connect((err) => {
  if(err) throw err;
  console.log('You are now connected to the database...');

//   var person = {name: 'Larry', age: 41, email: 'larrybird@gmail.com'};
//   connection.query('INSERT INTO people SET ?', person, (err, results, fields) => {
//     if(err) throw err; 
//   })
})