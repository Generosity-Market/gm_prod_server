const { ExtractJwt } = require('passport-jwt');

module.exports = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: 'Generosity Market',
    audience: 'generositymarket.org',
    // passReqToCallback: true,
};
