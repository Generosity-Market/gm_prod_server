const donation = require('./donation');
// const signUp = require('./signUp');
// const createdCause = require('./cause');
// const forgottenPassword = require('./pasword);

module.exports = {
    donation: (mailData) => donation.template(mailData),
    // signUp: (mailData) => signUp.template(mailData),
    // createdCause: (mailData) => createdCause.template(mailData),
    // forgottenPassword: (mailData) => forgottenPassword.template(mailData),
};
