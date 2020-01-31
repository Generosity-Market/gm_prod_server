const { User } = require('../../../models');

const verifyToken = async (jwt_payload, done) => {
    try {
        console.log('jwt_payload: ', jwt_payload);
        const user = await User.findOne({
            where: {
                id: jwt_payload.id,
            },
        });

        if (user.err) {
            return done(user.err, false);
        }
        if (user && !user.err) {
            return done(null, user);
        }

        return done(null, false);
    } catch (error) {
        return done(error, null);
    }
};

module.exports = verifyToken;
