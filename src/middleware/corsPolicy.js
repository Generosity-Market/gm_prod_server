const corsPolicy = (req, res, next) => {
    const allowedDomains = ['http://localhost:3001', 'https://generosity-market.herokuapp.com/'];
    const { origin } = req.headers;
    if (allowedDomains.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};

module.exports = corsPolicy;
