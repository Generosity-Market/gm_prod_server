'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      cause_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Causes",
          key: "id"
        }
      },
      org_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Organizations",
          key: "id"
        }
      },
      white_text: {
        type: Sequelize.BOOLEAN(true),
        allowNull: false
      },
      round_image: {
        type: Sequelize.BOOLEAN(true),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Preferences');
  }
};