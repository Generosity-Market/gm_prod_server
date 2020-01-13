'use strict';
module.exports = (sequelize, DataTypes) => {
  var Preference = sequelize.define('Preference', {
    user_id: DataTypes.INTEGER,
    cause_id: DataTypes.INTEGER,
    org_id: DataTypes.INTEGER,
    white_text: DataTypes.BOOLEAN,
    round_image: DataTypes.BOOLEAN
  }, {});

  Preference.associate = function (models) {
    Preference.belongsTo(models.User, {
      as: "Users",
      foreignKey: "id"
    })
    Preference.belongsTo(models.Cause, {
      as: "Causes",
      foreignKey: "id"
    })
    Preference.belongsTo(models.Organization, {
      as: "Organizations",
      foreignKey: "id"
    })
  };

  return Preference;
};