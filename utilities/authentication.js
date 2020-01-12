const bcrypt = require('bcrypt');

// Creates a hashed password to be stored in the DB instead of plain text
exports.hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(10);
    let passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
};