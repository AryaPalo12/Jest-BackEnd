require("dotenv").config();


const config = {
  development: {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    // host : process.env.DB_HOST,
    // port : process.env.DB_PORT,    
    // dialect: "postgres",
    url : process.env.DB_URL,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
    
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    username: "fjgmwfgkgoldux",
    password: "76999dc6829bbbfb7e06ae74d90ae03eeee7d211d99fde9b565df114e6a3381b",
    database: "d3qcl26i0puh5q",
    host : "ec2-52-207-90-231.compute-1.amazonaws.com",
    port : "5432",    
    dialect: "postgres",
    url : process.env.DB_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  }
}

module.exports = config;
