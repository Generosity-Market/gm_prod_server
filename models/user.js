module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        cover_image: DataTypes.STRING,
        profile_image: DataTypes.STRING,
    }, {});

    User.associate = (models) => {
        User.hasMany(models.Preference, {
            as: 'Preferences',
            foreignKey: 'user_id',
        });
        User.hasMany(models.Cause, {
            as: 'Causes',
            foreignKey: 'user_id',
        });
        User.hasMany(models.Organization, {
            as: 'Organizations',
            foreignKey: 'user_id',
        });
        User.hasMany(models.Comment, {
            as: 'Comments',
            foreignKey: 'user_id',
        });
        User.hasMany(models.Donation, {
            as: 'Donations',
            foreignKey: 'user_id',
        });
    };

    return User;
};
