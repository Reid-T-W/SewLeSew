const Sequelize = require('sequelize');
const User = require('./User');
const Post = require('./Post');
const Picture = require('./Picture');
const Video = require('./Video');
const CompletedDonation = require('./CompletedDonation');
const PendingDonation = require('./PendingDonation');
const Document = require('./Document');

const db = {};

const sequelize = new Sequelize('wegene_admin', 'wegene_admin', '1234', {
  host: 'localhost',
  dialect: 'postgres',
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

module.exports = db;
