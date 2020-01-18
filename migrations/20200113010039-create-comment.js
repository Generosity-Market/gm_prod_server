/* eslint-disable no-unused-vars */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        donation_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Donations',
                key: 'id',
            },
        },
        image_src: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        public_comment: {
            type: Sequelize.STRING,
        },
        private_comment: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Comments'),
};
