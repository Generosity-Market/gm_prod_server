require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { BasicStrategy } = require('passport-http');

const routes = require('./src/routes');

// Authentication helpers
const {
    verifyToken,
    verifyUser,
} = require('./src/auth/middleware');
const authConfig = require('./src/auth/config');

const {
    handleError,
    logger,
} = require('./src/utilities');

const app = express();

// NOTE: Required for production app
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(passport.initialize());

passport.use(new BasicStrategy(verifyUser));
passport.use(new JwtStrategy(authConfig.options, verifyToken));

app.use(routes);

app.use((err, req, res) => {
    handleError(err, res);
});

// NOTE: This conditional is excluded during testing
if (require.main === module) {
    const port = app.get('port');
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        logger.success('Node app is running on port', port);
    });
}

module.exports = app;
