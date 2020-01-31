const { ExtractJwt } = require('passport-jwt');

module.exports = {
    secret: process.env.JWT_SECRET,
    options: {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // issuer: 'Generosity Market',
        // audience: 'generositymarket.org',
        // passReqToCallback: true,
    },
    jwt_options: {
        expiresIn: '90d',
        issuer: 'Generosity Market',
        audience: 'generositymarket.org',
    },
};
