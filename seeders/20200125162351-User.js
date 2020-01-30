/* eslint-disable no-unused-vars */
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
        {
            email: 'test_user@testemail.com',
            first_name: 'Testy',
            last_name: 'Tester',
            address_1: '123 Testing Dr',
            address_2: 'Unit 4',
            city: 'Atlanta',
            state: 'GA',
            zipcode: '30350',
            phone: '5551234567',
            salt: '$2b$10$L773C3E.g43uo7QozLPn.u',
            password: '$2b$10$wHLFSZSpjetjiAIQ4o06gOHiXT./U6r6LzDbDx2EZk38xyNfRff7q',
            cover_image: 'https://generosity-market-user-images.s3.amazonaws.com/coverImages/hot_air_balloon.jpg',
            profile_image: 'https://generosity-market-user-images.s3.amazonaws.com/profileImages/Joe-logo.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {}),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
