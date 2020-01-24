// const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const {
    Donation,
    // Comment,
} = require('../models/index');

const { stripe } = require('../utilities');

// const { sendEmail } = require('../services/email/nodeMailer');

// This route will also add comments (if applicable)
// TODO: for ppl who are not signed in, lets create a user before making the charge.
// TODO: Don't use a password for now
// TODO: We also need to update the user schema to not require a password...

// ALSO TODO: Convert to async/await...
exports.createDonation = async (req, res) => {
    const {
        cart,
        user_id,
        // amount,
        ...rest
    } = req.body;

    try {
        const customer = await stripe.createCustomer(req.body);
        const charge = await stripe.createCharge({ ...req.body, customer });

        if (charge.status === 'succeeded') {
            const bulkDonations = cart.map((item) => ({
                amount: item.amount,
                user_id,
                cause_id: item.cause_id,
                email: rest.email,
                stripe_id: charge.id,
                stripe_customer_id: charge.customer,
            }));
            // console.log("Charge: ", charge);

            // sendEmail('donation', {
            //     amount,
            //     cart,
            //     email: rest.email,
            //     receipt_url: charge.receipt_url,
            // });

            const donation = await Donation.bulkCreate(bulkDonations);

            if (donation && !donation.error) {
                res.status(201).json({ status: 'Success', response: donation, charge });
            } else {
                res.status(500).send({ status: 'failed', error: donation.error });
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }

    // NOTE: user_id and amount will be used in both donation and comment functions
    // In the callback of the donation function, ...
    // ...use the returned id as the donation_id for the comment function.
};
