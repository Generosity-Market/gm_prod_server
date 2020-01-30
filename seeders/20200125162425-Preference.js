/* eslint-disable no-unused-vars */
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Preferences', [
        {
            user_id: 1,
            cause_id: null,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 1,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 2,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 3,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 4,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 5,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 6,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 7,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 8,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 9,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            user_id: null,
            cause_id: 10,
            org_id: null,
            white_text: true,
            round_image: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {}),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Preferences', null, {}),
};