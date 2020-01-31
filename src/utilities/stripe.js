const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

const createCustomer = ({ email, token }) => stripe.create.customer({
    email,
    card: token.id,
});

const createCharge = ({ amount, cart, customer }) => stripe.charges.create({
    amount,
    description: `GenerosityMarket.co - ${cart[0].cause}`,
    currency: 'usd',
    customer: customer.id,
});

module.exports = {
    createCustomer,
    createCharge,
};
