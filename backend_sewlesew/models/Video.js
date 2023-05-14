const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    // Model attributes are defined here
    videoFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // public_id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // url: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  }, {});
  Video.associate = (models) => {
    Video.belongsTo(models.Post);
  };

  return Video;
};
