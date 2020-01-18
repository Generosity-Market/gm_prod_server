module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
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
        profile_image: DataTypes.STRING,
    }, {});

    Organization.associate = (models) => {
        Organization.belongsTo(models.User, {
            as: 'Users',
            foreignKey: 'user_id',
        });
        Organization.hasMany(models.Preference, {
            as: 'Preferences',
            foreignKey: 'org_id',
        });
        Organization.hasMany(models.Cause, {
            as: 'Causes',
            foreignKey: 'org_id',
        });
    };

    return Organization;
};
