const mysql = require('mysql2/promise')
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env

const database = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
})

database.getConnection()
  .then(result => {
    console.log('Connected to the MySQL server.', result);
  })
  .catch(err => {
    console.error('Error connecting to the MySQL server:', err);
  })

module.exports = database