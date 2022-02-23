const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const { awsUtils } = require('../utilities');
const authUtils = require('../auth/utils');

const {
    User,
    Preference,
    Cause,
    Donation,
    Comment,
} = require('../../models');

const totalRaisedQuery = '(SELECT SUM("Donations"."amount") FROM "Donations" WHERE "Donations"."cause_id" = "Cause"."id")';

// Signup a user, returns user data w/Preferences
exports.registerUser = async (req, res) => {
    const {
        email,
        password,
        confirmPassword = password,
        round_image = true,
        white_text = false,
        ...rest
    } = req.body;

    if (!email || !password) {
        res.status(403).send({ error: 'email and password must not be blank.' });
    }

    const salt = bcrypt.genSaltSync(10);
    // let passwordHash = bcrypt.hashSync(password, salt);

    const newUser = {
        ...rest,
        salt,
        email: email.toLowerCase(),
        password: authUtils.hashPassword(password),
    };

    if (password === confirmPassword) {
        try {
            const user = await User.findOrCreate({
                where: { email: email.toLowerCase() },
                defaults: { ...newUser },
            });

            const userJson = JSON.parse(JSON.stringify(user))[0];

            if (userJson) {
                const options = { user_id: userJson.id, round_image, white_text };
                const preferences = await Preference.create(options);

                userJson.Preferences = preferences;
                res.status(201).send(userJson);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(403).send({ error: 'Passwords do not match.', body: req.body });
    }
};

// Login route returns User data w/Preferences
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if ((!email) || (!password)) {
        return res.status(403).json({ error: 'Fields must not be empty.' });
    }

    try {
        const user = await User.findOne({
            where: {
                email: email.toLowerCase(),
            },
            include: [{
                model: Preference,
                as: 'Preferences',
            }],
        });

        if (!user) {
            return res.status(404).json({ error: 'Could not find email in our system.' });
        }

        const userJson = JSON.parse(JSON.stringify(user));

        if (bcrypt.compareSync(password, userJson.password)) {
            const token = authUtils.signJwt({ id: user.id });
            res.status(200).json({ user: userJson, auth_token: token });
        } else {
            return res.status(403).json({ error: 'Username or password does not match.' });
        }
    } catch (error) {
        return res.status(404).json(error);
    }
    return false;
};

// Get all users w/Preferences
exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            include: [{
                model: Preference,
                as: 'Preferences',
            }],
        });

        if (user === null) {
            return res.status(404).send('No users found.');
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get a user by id w/Preferences & Causes
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                model: Preference,
                as: 'Preferences',
            }],
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
    const { Preferences, ...rest } = req.body;
    // // Changing the password to the hashed password
    // updatedUser.password = hashPassword(req.body.password);

    try {
        const user = await User.update(rest, {
            where: {
                id: req.params.id,
            },
            returning: true,
        });

        const userJson = JSON.parse(JSON.stringify(user[1][0]));

        if (Preferences) {
            try {
                const prefs = await Preference.update(Preferences, {
                    where: {
                        user_id: userJson.id,
                    },
                    returning: true,
                });

                const prefsJson = JSON.parse(JSON.stringify(prefs[1][0]));

                userJson.Preferences = prefsJson;
                return res.status(201).send(userJson);
            } catch (error) {
                res.status(500).send(error);
            }
        }

        res.status(201).send(userJson);
    } catch (error) {
        res.status(500).send(error);
    }
    return false;
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
        return res.status(500).send({ error });
    }
};

// Get causes created by the users id
exports.getUserCauses = async (req, res) => {
    try {
        const causes = await Cause.findAll({
            where: {
                user_id: req.params.id,
            },
            attributes: {
                include: [[sequelize.literal(totalRaisedQuery), 'totalRaised']],
            },
            include: [{
                model: Preference,
                as: 'Preferences',
            }, {
                model: Donation,
                as: 'Donations',
                include: [{
                    model: Comment,
                    as: 'Comments',
                }],
            }],
        });

        if (causes) {
            res.status(200).json(causes);
        } else {
            res.status(404).send({ error: 'No causes found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get Causes that have Donations made by the user (Search by user_id)
exports.getSupportedCauses = async (req, res) => {
    try {
        const donations = await Cause.findAll({
            // attributes: ['name', 'profile_image', 'id'],
            include: [{
                where: {
                    user_id: req.params.id,
                },
                model: Donation,
                as: 'Donations',
                attributes: ['amount', 'updatedAt', 'user_id'],
            }],
        });

        if (donations) {
            return res.status(200).json(donations);
        }
        return res.status(404).send({ error: 'No Donations found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Delete a user from the db
// NOTE: In the future we must delete associated data first
// TODO: add onDelete: 'CASCADE' to model??
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).send({ message: `User id #${req.params.id} deleted: ${!!deleted}` });
    } catch (error) {
        res.status(500).send(error);
    }
};
