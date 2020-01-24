const appColors = require('./colors');

const {
    green,
    white,
} = appColors;

const styles_donation = (
    `
    .donation_message span,
    .cause_item span { 
        color: ${green.dark}; 
    }

    .thank_you {
        background-color: ${green.medium};
        color: ${white};
        letter-spacing: 0.05rem;
        padding: 1.5rem;
    }

    .cause_wrapper {
        text-align: center;
    }

    .cause_item {
        background-color: ${white};
        margin: 2rem auto;
        min-height: 300px;
        padding: 1.5rem;
        width: 450px;
    }

    .cause_item .title {
        margin-top: 2rem;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .cause_item .image {
        background-position: center;
        background-size: cover;
        height: 250px;
        overflow: hidden;
        width: 450px;
    }`
);

const mobileStyles = (
    `
    @media only screen and (max-width: 600px) {
        .cause_item {
            padding: 1rem;
            min-height: 150px;
            width: 250px;
        }

        .cause_item .image {
            height: 135px;
            width: 250px;
        }

        .cause_item .title {
            font-size: 1rem;
        }
    }
    `
);

module.exports = styles_donation + mobileStyles;
