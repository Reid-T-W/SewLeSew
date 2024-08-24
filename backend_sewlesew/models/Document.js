const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    // Model attributes are defined here
    type: {
      type: DataTypes.STRING,
    },
    documentFile: {
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

  Document.addHook('afterCreate', async (post, options) => {
    return sequelize
            .query('REFRESH MATERIALIZED VIEW posts_users_joined;')
            .then(() => {console.log("Materialized view refreshed")})
  }),

  Document.associate = (models) => {
    Document.belongsTo(models.Post);
  };

  return Document;
};
