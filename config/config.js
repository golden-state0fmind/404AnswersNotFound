require('dotenv').config();

module.exports = {
  "development": {
    "username": "antonioreyes",
    "password": process.env.DB_PASS,
    "database": "express_auth_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "antonioreyes",
    "password": process.env.DB_PASS,
    "database": "express_auth_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "express_auth_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
