require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
    },
    ci: {
        url: process.env.CI_TEST_DATABASE_URL,
        dialect: 'postgres',
        logging: false,
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
        logging: false,
    },
    staging: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
};
