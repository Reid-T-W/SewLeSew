const Sequelize = require('sequelize');
const User = require('./User');
const Post = require('./Post');
const Picture = require('./Picture');
const Video = require('./Video');
const CompletedDonation = require('./CompletedDonation');
const PendingDonation = require('./PendingDonation');
const Document = require('./Document');
const fs = require('fs');
const path = require('path');
const db = {};

const dotenv = require('dotenv');

dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE,
                                process.env.DB_USERNAME,
                                process.env.PASSWORD, {
                                  host: process.env.HOST,
                                  dialect: process.env.DB_DIALECT,
                                });

module.exports = sequelize;
const userModel = User(sequelize, Sequelize.DataTypes);
const postModel = Post(sequelize, Sequelize.DataTypes);
const completedDonation = CompletedDonation(sequelize, Sequelize.DataTypes);
const pendingDonation = PendingDonation(sequelize, Sequelize.DataTypes);
const document = Document(sequelize, Sequelize.DataTypes);
const picture = Picture(sequelize, Sequelize.DataTypes);
const video = Video(sequelize, Sequelize.DataTypes);

db[userModel.name] = userModel;
db[postModel.name] = postModel;
db[completedDonation.name] = completedDonation;
db[pendingDonation.name] = pendingDonation;
db[document.name] = document;
db[picture.name] = picture;
db[video.name] = video;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// // Bootstrap models
// const models = {}
// fs.readdirSync(__dirname).forEach(function (file) {
//     if (~file.indexOf('.js') && file.indexOf('index.js') < 0) {
//         // var model = sequelize.import(file);
//         var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
//         models[model.name] = model;
//     }
// });

sequelize.sync().then(async function() {
    await db.Post.addFullTextIndex();
    // await db.Post.addHook();
});


module.exports = db;
