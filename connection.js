const mysql = require('mysql');
const env = require('dotenv').config();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

module.exports = connection;