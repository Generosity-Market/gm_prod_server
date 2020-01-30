require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');

const { handleError, logger } = require('./utilities');
const { authenticateUser } = require('./middleware');

const routes = require('./routes/index');
const { User } = require('./models/index');

const app = express();

// NOTE: Required for production app...setting the port
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(passport.initialize());

passport.use(new BasicStrategy(authenticateUser));

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
