const sequelize = require('sequelize');
const { awsUtils } = require('../utilities');

const {
    Cause,
    Comment,
    Donation,
    Preference,
    // User,
} = require('../../models');

const totalRaisedQuery = '(SELECT SUM("Donations"."amount") FROM "Donations" WHERE "Donations"."cause_id" = "Cause"."id")';

// Create a cause
exports.createCause = async (req, res) => {
    try {
        const reqData = await awsUtils.parseUploadData(req);
        const imageChanges = await awsUtils.findOrCreateFile(reqData);

        // TODO: when a user sends the `organization_name`, lets do a search for it
        // TODO: Then get the `id` from the organization, and store it in the `cause->org_id`
        const {
            round_image,
            white_text,
            // organization_name,
            ...rest
        } = JSON.parse(reqData.fields.state);

        const newCause = {
            ...rest,
            ...imageChanges,
        };

        const cause = await Cause.create(newCause);

        const causeJson = JSON.parse(JSON.stringify(cause));

        if (causeJson) {
            const options = { cause_id: causeJson.id, round_image, white_text };
            const preferences = await Preference.create(options);

            causeJson.Preferences = preferences;
            return res.status(201).send(causeJson);
        }

        return res.status(201).send(causeJson);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Getting the entire cause list w/ Preferences, Donations, totalRaised and Comments
// TODO: create a way to change the sort on a property that's passed in the request
// TODO: instead of creating multiple routes / controllers...
exports.getCauses = async (req, res) => {
    try {
        const causes = await Cause.findAll({
            attributes: {
                include: [[sequelize.literal(totalRaisedQuery), 'totalRaised']],
            },
            include: [{
                model: Preference,
                as: 'Preferences',
            },
            {
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

// Get a cause by the id w/Preferences, Donations, and Comments, and totalRaised
exports.getCauseById = async (req, res) => {
    try {
        const cause = await Cause.findOne({
            where: { id: req.params.id },
            attributes: {
                include: [[sequelize.literal(totalRaisedQuery), 'totalRaised']],
            },
            include: [{
                model: Preference,
                as: 'Preferences',
            },
            {
                model: Donation,
                as: 'Donations',
                include: [{
                    model: Comment,
                    as: 'Comments',
                }],
            }],
        });

        if (cause) {
            res.status(200).send(cause);
        } else {
            res.status(404).send({ error: 'Cause not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// TODO: NOTE will need to find out how to remove an image from Amazon S3 as well
exports.editCauseById = async (req, res) => {
    const { Preferences, ...rest } = req.body;

    try {
        const cause = await Cause.update(rest, {
            where: {
                id: req.params.id,
            },
            attributes: {
                include: [[sequelize.literal(totalRaisedQuery), 'totalRaised']],
            },
            returning: true,
        });

        const causeJson = JSON.parse(JSON.stringify(cause[1][0]));

        if (Preferences) {
            try {
                const prefs = await Preference.update(Preferences, {
                    where: {
                        cause_id: causeJson.id,
                    },
                    returning: true,
                });

                const prefsJson = JSON.parse(JSON.stringify(prefs[1][0]));

                causeJson.Preferences = prefsJson;
                return res.status(201).send(causeJson);
            } catch (error) {
                res.status(500).send(error);
            }
        }

        return res.status(201).send(causeJson);
    } catch (error) {
        res.status(500).send(error);
    }
    return false;
};
