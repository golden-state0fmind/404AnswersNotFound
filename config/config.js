require('dotenv').config();

module.exports = {
  "development": {
    "username": "antonioreyes",
    "password": null,
    "database": "404User",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "antonioreyes",
    "password": null,
    "database": "404User",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "express_auth_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
