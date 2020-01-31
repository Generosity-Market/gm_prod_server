const passport = require('passport');

const authenticateRoute = () => passport.authenticate('jwt', { session: false });

module.exports = authenticateRoute;
