const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const PendingDonation = sequelize.define('PendingDonation', {
    // Model attributes are defined here
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});
  PendingDonation.associate = (models) => {
    PendingDonation.belongsTo(models.User);
    PendingDonation.belongsTo(models.Post);
    PendingDonation.hasOne(models.CompletedDonation);
  };

  return PendingDonation;
};
