const dotenv = require('dotenv');

dotenv.config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    instanceName: process.env.INSTANCE_NAME,
  },
  operatorsAliases: process.env.OPERATORS_ALIASES,
};

module.exports = development;
