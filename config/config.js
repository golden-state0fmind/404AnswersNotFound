require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.USER,
    "password": process.env.DB_PASS,
    "database": process.env.DEV_DB,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  },
  "test": {
    "username": process.env.USER,
    "password": process.env.DB_PASS,
    "database": process.env.TEST_DB,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  }
}
