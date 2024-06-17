require("dotenv").config();

module.exports = {
    development: {
        // url is set in docker environment vars
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        define: {
            underscored: true
        }
    },
    test: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        define: {
            underscored: true
        }
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        define: {
            underscored: true
        }
    }
}; 