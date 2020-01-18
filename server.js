require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const morgan = require('morgan');
// const bcrypt = require('bcrypt');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');

const routes = require('./routes/index');
const { handleError } = require('./utilities/error');

const { User } = require('./models/index');

const { authenticateUser } = require('./middleware');

const app = express();

// Required for production app...setting the port
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
app.use(routes);

app.use((err, req, res) => {
    handleError(err, res);
});

// the 'if' is used for testing.
// getting the port from above..do this for production instead of localhost:3000
if (require.main === module) {
    app.listen(app.get('port'), () => {
        // eslint-disable-next-line no-console
        console.log('Node app is running on port', app.get('port'));
    });
}

module.exports = app;
