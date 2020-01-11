require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const passport = require('passport');
const routes = require('./routes/index');
const BasicStrategy = require('passport-http').BasicStrategy;

const app = express();

// Required for production app...setting the port
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use(passport.initialize());

const authenticateUser = (username, password, done) => {
    model.User.findOne({
        where: {
        'username': username.toLowerCase()
        }
    }).then(function (user) {
        if (user == null) {
        return done(null, false, { message: 'Invalid email and/or password: please try again' })
        }

        let hashedPassword = bcrypt.hashSync(password, user.salt)

        if (user.password === hashedPassword) {
        return done(null, user)
        }

        return done(null, false, { message: 'Invalid email and/or password: please try again' })
    })
}

passport.use(new BasicStrategy(authenticateUser))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    model.User.findOne({
        where: {
        'id': id
        }
    }).then(function (user) {
        if (user == null) {
        done(new Error('Wrong user id'))
        }

        done(null, user)
    })
})

app.use('/api', routes);
app.use(routes);

// the 'if' is used for testing.
// getting the port from above..do this for production instead of localhost:3000
if (require.main === module) {
    app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'));
    });
}
