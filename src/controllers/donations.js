const { stripe } = require('../utilities');
const { sendEmail } = require('../services');

const {
    Donation,
    // Comment,
    User,
} = require('../../models');

// Creates a stripe charge, sends confirmation email, and saves data to database
exports.createDonation = async (req, res) => {
    const {
        cart,
        user_id,
        ...rest
    } = req.body;

    try {
        const email = rest.email.toLowerCase();
        // NOTE: Make sure a user is created one way or another upon donation
        // ...in case they sign up later we can link the donation to the email used
        const user = await User.findOrCreate({
            where: { email },
            defaults: { email },
        });

        if (!user.length || user.error) {
            return res.status(500).send({ error: 'error finding or creating user' });
        }

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

            sendEmail('donation', { ...req.body, charge });

            const donation = await Donation.bulkCreate(bulkDonations);

            if (donation && !donation.error) {
                return res.status(201).json({ status: 'Success', donations: donation, charge });
            }

            return res.status(500).send({ status: 'failed', error: donation.error });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
    return false;
};
