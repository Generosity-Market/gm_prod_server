/* eslint-disable no-unused-vars */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Organizations', {
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
        tax_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        legal_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        display_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        heading: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mission: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        site_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        stripe_id: {
            type: Sequelize.STRING,
        },
        cover_image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        profile_image: {
            type: Sequelize.STRING,
            allowNull: false,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Organizations'),
};
