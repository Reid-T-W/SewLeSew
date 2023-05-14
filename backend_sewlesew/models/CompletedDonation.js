const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// require sequelize from '../configs/db.js';
// const sequelize = require('../src/configs/db');

module.exports = (sequelize, DataTypes) => {
  const CompletedDonation = sequelize.define('CompletedDonation', {
    // Model attributes are defined here
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});
  CompletedDonation.associate = (models) => {
    CompletedDonation.belongsTo(models.User);
    CompletedDonation.belongsTo(models.Post);
    CompletedDonation.belongsTo(models.PendingDonation);
  };

  return CompletedDonation;
};
