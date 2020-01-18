/* eslint-disable no-unused-vars */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Causes', {
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
        org_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Organizations',
                key: 'id',
            },
        },
        tax_id: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        goal_amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(5000),
            allowNull: false,
        },
        purpose: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        featured: {
            type: Sequelize.BOOLEAN(false),
        },
        cover_image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        profile_image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        completed: {
            type: Sequelize.BOOLEAN(false),
        },
        archived: {
            type: Sequelize.BOOLEAN(false),
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Causes'),
};
