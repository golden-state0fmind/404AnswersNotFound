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
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
