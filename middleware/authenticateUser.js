const bcrypt = require('bcrypt');
const { User } = require('../models');

const authenticateUser = (username, password, done) => {
    User.findOne({
        where: {
            username: username.toLowerCase(),
        },
    }).then((user) => {
        if (user == null) {
            return done(null, false, { message: 'Invalid email and/or password: please try again' });
        }

        const hashedPassword = bcrypt.hashSync(password, user.salt);

        if (user.password === hashedPassword) {
            return done(null, user);
        }

        return done(null, false, { message: 'Invalid email and/or password: please try again' });
    });
};

module.exports = authenticateUser;
