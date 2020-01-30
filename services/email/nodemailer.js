const nodemailer = require('nodemailer');
const templates = require('./templates');
const { logger } = require('../../utilities');

// TODO: Determine what other types of emails we need to send and customize this service

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PW,
    },
});

const getMailOptions = (type, mailData) => {
    const { subject, html } = templates[type](mailData);

    return {
        from: process.env.APP_EMAIL,
        to: mailData.email,
        subject,
        html,
    };
};

exports.sendEmail = (type, mailData) => {
    const options = getMailOptions(type, mailData);

    transporter.sendMail(options, (error, info) => {
        if (error) {
            logger.error(error);
        } else {
            logger.success('Email sent: ', info.response);
        }
    });
};
