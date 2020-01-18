const bcrypt = require('bcrypt');

// Creates a hashed password to be stored in the DB instead of plain text
exports.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
};
