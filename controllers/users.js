const sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const { awsUtils } = require('../utilities');

const {
    User,
    Preference,
    Cause,
    Donation,
    Comment,
} = require('../models/index');

const {
    createNewObject,
    hashPassword,
    getExclusions,
} = require('../utilities');

//-----------------------
//      User Routes
//-----------------------

// Passport Basic Authentication Strategy
passport.use(new BasicStrategy(
    function (username, password, done) {
        const userPassword = users[username];
        if (!userPassword) { return done(null, false); }
        if (userPassword !== password) { return done(null, false); }
        return done(null, username);
    }
));

// Signup a user, returns user data w/Preferences
exports.registerUser = async (req, res) => {
    const { email, password, confirmPassword = password, round_image = true, white_text = false, ...rest } = req.body;

    if (!email || !password) {
        res.status(403).send({ error: 'email and password must not be blank.' })
    }

    const salt = bcrypt.genSaltSync(10);
    // let passwordHash = bcrypt.hashSync(password, salt);

    const newUser = {
        ...rest,
        salt,
        email: email.toLowerCase(),
        password: hashPassword(password),
    }

    if (password === confirmPassword) {
        try {
            const user = await User.findOrCreate({
                where: { email: email.toLowerCase() },
                defaults: { ...newUser },
            });

            const userJson = JSON.parse(JSON.stringify(user))[0];

            if (userJson) {
                const preferences = await Preference.create({ user_id: userJson.id, round_image, white_text });

                userJson['Preferences'] = preferences;
                res.status(201).send(userJson);
            }
        } catch (error) {
            res.status(400).send(error);
        }

    } else {
        res.status(403).send({ error: "Passwords do not match.", body: req.body })
    }
};

// Login route returns User data w/Preferences
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Req.body: ", req.body);

    if ((!email) || (!password)) {
        res.status(403).send({ error: 'Fields must not be empty.' })
    }

    try {
        const user = await User.findOne({
            where: {
                email: email.toLowerCase(),
            },
            include: [{
                model: Preference,
                as: 'Preferences'
            }]
        });

        const userJson = JSON.parse(JSON.stringify(user));

        if (bcrypt.compareSync(password, userJson.password)) {
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            res.status(200).send({ user: userJson, auth_token: token });
        } else {
            res.status(403).send({ error: "Username or password does not match." })
        }

    } catch (error) {
        res.status(404).send({ error });
    }
};

// Get all users w/Preferences
exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            include: [{
                model: Preference,
                as: 'Preferences'
            }],
        });

        if (user === null) {
            return res.status(404).send('No users found.');
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Get a user by id w/Preferences & Causes
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Preference,
                as: 'Preferences'
            }]
        });

        if (user === null) {
            return res.status(404).send('User not found.');
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Edit users details
exports.editUser = async (req, res) => {
    const { address } = req.body;

    let updatedUser = {
        ...req.body,
        ...address,
    };

    // // Changing the password to the hashed password
    // updatedUser.password = hashPassword(req.body.password);

    try {
        const user = await User.update(updatedUser, {
            where: {
                id: req.params.id
            },
            returning: true,
        });

        res.status('201').send(user[1][0].dataValues);
        // console.log("User: ", user[1]);
        // Is good until we start updating preferences for the user

        //   Preference.update(updatedPrefs, {
        //     where: {
        //       user_id: req.params.id
        //     }
        //   })
        //     .then(prefs => {
        //       // Adding the id and Preferences to the user data returned to the front end
        //       updatedUser['Preferences'] = [updatedPrefs];
        //       updatedUser.id = Number(req.params.id);
        //       res.status('201').send(updatedUser);
        //     })
        //     .catch(err => {
        //       res.status('500').send(err);
        //     })
        // })

    } catch (error) {
        res.status('500').send(error);
    };
};

// Upload user images to AWS S3 bucket, set user image urls
exports.setUserImage = async (req, res) => {

    const reqData = await awsUtils.parseUploadData(req);
    const imageChanges = await awsUtils.findOrCreateFile(reqData);

    try {
        const user = await User.update(imageChanges, {
            where: {
                id: req.params.id,
            },
            returning: true,
        });

        if (user === null) return res.status(404).send('User not found.');

        return res.status('201').json(user[1][0]);
    } catch (error) {
        return res.status(500).send(error);
    }
}

// Get causes by the users id
exports.getUserCauses = async (req, res) => {
    try {
        const causes = await Cause.findAll({
            where: {
                user_id: req.params.id
            },
            attributes: Object.keys(Cause.attributes).concat([
                [
                    sequelize.literal('(SELECT SUM("Donations"."amount") FROM "Donations" WHERE "Donations"."cause_id" = "Cause"."id")'),
                    'totalRaised'
                ]
            ]),
            include: [{
                model: Preference,
                as: 'Preferences'
            }, {
                model: Donation,
                as: 'Donations',
                include: [{
                    model: Comment,
                    as: 'Comments'
                }]
            }],
        });

        if (causes) {
            res.status(200).json(causes);
        } else {
            res.status(404).send({ error: "No causes found" });
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json(error);
    };
}

// Get Causes that have Donations made by the user (Search by user_id)
exports.getSupportedCauses = async (req, res) => {
    try {
        const donations = await Cause.findAll({
            // attributes: ['name', 'mainImage', 'id'],
            include: [{
                where: {
                    user_id: req.params.id,
                },
                model: Donation,
                as: 'Donations',
                attributes: ['amount', 'updatedAt', 'user_id'],
            }]
        });

        if (donations) {
            return res.status(200).json(donations);
        } else {
            return res.status(404).send({ error: "No Donations found" });
        }
    } catch (error) {
        return res.status(500).json(err);
    }
}

// Delete a user from the db
// NOTE In the future we must delete associated data first
// TODO: add onDelete: 'CASCADE' to model??
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({ message: `User id #${req.params.id} deleted: ${!!deleted}` });
    } catch (error) {
        res.status(500).send(error);
    }
};
