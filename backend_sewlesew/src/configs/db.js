const { Sequelize, TEXT } = require('sequelize');

// const sequelize = new Sequelize('postgres://wegene_admin:1234@localhost:5432/wegene_admin')

const sequelize = new Sequelize('wegene_admin', 'wegene_admin', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
// Test connection
// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// testConnection();

// Close the connection
// await sequelize.close()
