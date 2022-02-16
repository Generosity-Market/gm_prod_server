/* eslint-disable indent */
const htmlBody = require('./body');
const styles_donation = require('./styles/donation');

const subject = 'Thank you for your support';

const renderCauses = (cart) => {
    const causeList = [];

    cart.forEach((cartItem) => {
        const causeAlreadyListed = causeList.filter((e) => e.cause === cartItem.cause).length > 0;

        if (!causeAlreadyListed) {
            causeList.push(cartItem);
        } else {
            // Find out the index within the causeList
            const index = causeList.findIndex((idx) => idx.cause === cartItem.cause);
            // Add cartItem amount to the correct cause
            causeList[index].amount += cartItem.amount;
        }
    });

    let html;
    // Render each cause tile
    causeList.forEach((listItem) => {
        html = `
        <div class="cause_item">
            <div class="image" style="background-image: url(${listItem.mainImage});"></div>
            <p class="title">
                <span>$${listItem.amount}</span> - ${listItem.cause}
            </p>
        </div>`;
    });

    return html;
};

const htmlContent = ({
    amount,
    cart,
    receipt_url,
}) => (
    `
    <h2 class="thank_you">Thank you for supporting these great causes</h2>
    <div class="main_content">

        <h1 class="donation_message">
            Your total donation: <span>$${amount / 100}</span>
        </h1>
        <p>
            Click to view your 
            <a href="${receipt_url}">
                Stripe Receipt
            </a>
        </p>

        <div class="cause_wrapper">
            ${renderCauses(cart)}
        </div>
    </div>`
);

exports.template = (mailData) => ({
    subject,
    html: htmlBody(styles_donation, htmlContent, mailData),
});
