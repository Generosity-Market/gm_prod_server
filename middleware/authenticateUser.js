const authenticateUser = (username, password, done) => {
    model.User.findOne({
        where: {
            'username': username.toLowerCase()
        }
    }).then(function (user) {
        if (user == null) {
            return done(null, false, { message: 'Invalid email and/or password: please try again' })
        }

        let hashedPassword = bcrypt.hashSync(password, user.salt)

        if (user.password === hashedPassword) {
            return done(null, user)
        }

        return done(null, false, { message: 'Invalid email and/or password: please try again' })
    })
};

module.exports = authenticateUser;