module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
        user_id: DataTypes.INTEGER,
        cause_id: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        email: DataTypes.STRING,
        stripe_id: DataTypes.STRING,
        stripe_customer_id: DataTypes.STRING,
    }, {});

    Donation.associate = (models) => {
        Donation.belongsTo(models.Cause, {
            as: 'Causes',
            foreignKey: 'id',
        });

        Donation.belongsTo(models.User, {
            as: 'Users',
            foreignKey: 'id',
        });

        Donation.hasMany(models.Comment, {
            as: 'Comments',
            foreignKey: 'donation_id',
        });
    };

    return Donation;
};
