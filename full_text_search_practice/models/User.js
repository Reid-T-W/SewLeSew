const { Sequelzie, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});

    User.associate = (model) => {
        User.hasMany(model.Product);
    };

    return User;
}