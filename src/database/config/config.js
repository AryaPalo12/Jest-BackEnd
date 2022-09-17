require("dotenv").config();


const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    url : process.env.DB_URL,    
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
    
  },

  production: {   
    dialect: "postgres",
    url : process.env.DB_URL,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
  }
}

module.exports = config;
