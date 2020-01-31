const bcrypt = require('bcrypt');
const { User } = require('../../../models');

const verifyUser = async (email, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (user == null) {
            return done(null, false, { message: 'Invalid email and/or password: please try again' });
        }

        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        }

        return done(null, false, { message: 'Invalid email and/or password: please try again' });
    } catch (error) {
        return done(error, false);
    }
};

module.exports = verifyUser;
