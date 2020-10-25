require('dotenv').config();
module.exports = {
  "development": {
    "username": "brian",
    "password": process.env.DB_PASS,
    "database": "404user",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "brian",
    "password": process.env.DB_PASS,
    "database": "404user",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
