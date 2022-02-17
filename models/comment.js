module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        user_id: DataTypes.INTEGER,
        donation_id: DataTypes.INTEGER,
        image_src: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        public_comment: DataTypes.STRING,
        private_comment: DataTypes.STRING,
    }, {});

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            as: 'Users',
            foreignKey: 'id',
        });
        Comment.belongsTo(models.Donation, {
            as: 'Donations',
            foreignKey: 'id',
        });
    };

    return Comment;
};
