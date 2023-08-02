const Sequelize = require('sequelize');
const Product = require('./Product.js');
const User = require('./User.js');
const { moduleExpression } = require('@babel/types');
const fs = require('fs');
const path = require('path');

const db = {}

const sequelize = new Sequelize('test', 'test', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});


module.export = sequelize;


const productModel = Product(sequelize, Sequelize.DataTypes);
const userModel = User(sequelize, Sequelize.DataTypes);

db[productModel.name] = productModel
db[userModel.name] = userModel

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize
db.Sequelize = Sequelize


// Bootstrap models
const models = {}
fs.readdirSync(__dirname).forEach(function (file) {
    if (~file.indexOf('.js') && file.indexOf('index.js') < 0) {
        // var model = sequelize.import(file);
        var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        models[model.name] = model;
    }
});

sequelize.sync().then(function() {
    models.Product.addFullTextIndex();
});

module.exports = db;
