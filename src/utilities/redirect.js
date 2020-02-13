const redirectTo = (url) => (req, res) => res.redirect(url);

module.exports = redirectTo;
