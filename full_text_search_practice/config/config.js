const dotenv = require('dotenv')
const { dialectOptions, operatorsAliases } = require('../../backend_sewlesew/config/config')

dotenv.config()

const development = {
    username: process.env.DB_USERNAME,
    password: process.eventNames.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        instance_name: process.env.DB_INSTANCE_NAME,
    },
    operatorsAliases: process.env.DB_OPERATORS_ALIASES,
};