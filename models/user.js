'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    phone: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    profileImage: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    User.hasMany(models.Preference, {
      as: "Preferences",
      foreignKey: "userID"
    })
    User.hasMany(models.Cause, {
      as: "Causes",
      foreignKey: "userID"
    })
    User.hasMany(models.Organization, {
      as: "Organizations",
      foreignKey: "userID"
    })
    User.hasMany(models.Comment, {
      as: "Comments",
      foreignKey: "userID"
    })
    User.hasMany(models.Donation, {
      as: "Donations",
      foreignKey: "userID"
    })
  };

  return User;
};