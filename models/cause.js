
module.exports = (sequelize, DataTypes) => {
    const Cause = sequelize.define('Cause', {
        user_id: DataTypes.INTEGER,
        org_id: DataTypes.INTEGER,
        tax_id: DataTypes.STRING,
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        goal_amount: DataTypes.INTEGER,
        description: DataTypes.STRING,
        purpose: DataTypes.STRING,
        icon: DataTypes.STRING,
        featured: DataTypes.BOOLEAN,
        cover_image: DataTypes.STRING,
        profile_image: DataTypes.STRING,
        completed: DataTypes.BOOLEAN,
        archived: DataTypes.BOOLEAN,
    }, {});

    Cause.associate = (models) => {
        Cause.belongsTo(models.User, {
            as: 'Users',
            foreignKey: 'id',
        });

        Cause.belongsTo(models.Organization, {
            as: 'Organizations',
            foreignKey: 'id',
        });

        Cause.hasMany(models.Preference, {
            as: 'Preferences',
            foreignKey: 'cause_id',
        });

        Cause.hasMany(models.Donation, {
            as: 'Donations',
            foreignKey: 'cause_id',
        });
    };

    return Cause;
};
