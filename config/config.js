require('dotenv').config();

const baseConfig = {
    dialect: 'postgres',
};

module.exports = {
    development: {
        ...baseConfig,
        url: process.env.DEV_DATABASE_URL,
    },
    ci: {
        ...baseConfig,
        url: process.env.CI_TEST_DATABASE_URL,
        logging: false,
    },
    test: {
        ...baseConfig,
        url: process.env.TEST_DATABASE_URL,
        logging: false,
    },
    staging: {
        ...baseConfig,
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: true,
            rejectUnauthorized: false,
        },
    },
    production: {
        ...baseConfig,
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: true,
            rejectUnauthorized: false,
        },
    },
};
