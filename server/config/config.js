require("dotenv").config();

module.exports = {
    development: {
        // url is set in docker environment vars
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    },
    test: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    }
}; 