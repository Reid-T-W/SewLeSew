// const { Sequelize, DataTypes } = require('sequelize');
// // const sequelize = new Sequelize('sqlite::memory:');
// // require sequelize from '../configs/db.js';
// // const sequelize = require('../src/configs/db');

// module.exports = (sequelize, DataTypes) => {
//   const Message = sequelize.define('Message', {
//     // Model attributes are defined here
//     messageContent: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   }, {});
//   Message.associate = (models) => {
//     Message.belongsTo(models.User);
//     Message.hasMany(models.Document);
//   };

//   return Message;
// };
