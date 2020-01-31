require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const { Strategy } = require('passport-jwt');
const authConfig = require('./src/auth/config');
// const { BasicStrategy } = require('passport-http');

const routes = require('./src/routes');
const { User } = require('./models');
const { verifyToken } = require('./src/auth/middleware');

const {
    handleError,
    logger,
} = require('./src/utilities');

const app = express();

// NOTE: Required for production app...setting the port
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(passport.initialize());

// passport.use(new BasicStrategy(authUser));

passport.use(new Strategy(authConfig, verifyToken));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({
        where: {
            id,
        },
    })
        .then((user) => {
            if (user == null) {
                done(new Error('Wrong user id'));
            }

            done(null, user);
        });
});

app.use('/api', routes);

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
