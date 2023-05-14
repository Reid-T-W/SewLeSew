const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    // Model attributes are defined here
    pictureFile: {
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
  Picture.associate = (models) => {
    Picture.belongsTo(models.Post);
  };

  return Picture;
};
