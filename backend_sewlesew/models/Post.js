const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // Model attributes are defined here
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalRaised: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Post.associate = (models) => {
    Post.hasMany(models.Document);
    Post.hasMany(models.Picture);
    Post.hasMany(models.Video);
    Post.hasMany(models.PendingDonation);
    Post.hasMany(models.CompletedDonation);
    Post.belongsTo(models.User);
  };

  return Post;
};
