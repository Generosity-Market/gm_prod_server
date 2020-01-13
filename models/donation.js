'use strict';
module.exports = (sequelize, DataTypes) => {
  var Donation = sequelize.define('Donation', {
    user_id: DataTypes.INTEGER,
    cause_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    email: DataTypes.STRING,
    stripe_id: DataTypes.STRING,
    stripe_customer_id: DataTypes.STRING
  }, {});

  Donation.associate = function (models) {
    Donation.belongsTo(models.Cause, {
      as: "Causes",
      foreignKey: "id"
    })

    Donation.belongsTo(models.User, {
      as: "Users",
      foreignKey: "id"
    })

    Donation.hasMany(models.Comment, {
      as: "Comments",
      foreignKey: "donationID"
    })
  };

  return Donation;
};