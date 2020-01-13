'use strict';
module.exports = (sequelize, DataTypes) => {
  var Organization = sequelize.define('Organization', {
    user_id: DataTypes.INTEGER,
    tax_id: DataTypes.INTEGER,
    legal_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    heading: DataTypes.STRING,
    mission: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    site_url: DataTypes.STRING,
    stripe_id: DataTypes.STRING,
    cover_image: DataTypes.STRING,
    profile_image: DataTypes.STRING
  }, {});

  Organization.associate = function (models) {
    Organization.belongsTo(models.User, {
      as: "Users",
      foreignKey: "userID"
    })
    Organization.hasMany(models.Preference, {
      as: "Preferences",
      foreignKey: "orgID"
    })
    Organization.hasMany(models.Cause, {
      as: "Causes",
      foreignKey: "orgID"
    })
  };

  return Organization;
};