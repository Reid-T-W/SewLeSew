const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // Model attributes are defined here
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalRaised: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  //Adding a before create hook that updates the
  //materialized view with the new post
  Post.addHook('afterCreate', async (post, options) => {
    await refresh_materialized_view()
    // .then(() => {
    //   console.log('Materialized view refreshed')
    //   return post
    // })
  });

  const refresh_materialized_view = async () => {
    return sequelize
            .query('REFRESH MATERIALIZED VIEW posts_users_joined')
  }

  // Post.addHook('afterCreate', async (post, options) => {
  //   return sequelize
  //           .query('REFRESH MATERIALIZED VIEW posts_users_joined;')
  //           .then(() => {
  //             console.log("Materialized view refreshed")
  //             return post
  //           })
  // }),

  Post.getSearchVector = () => {
    return 'posttext';
  },






  Post.addFullTextIndex = () => {
      if(sequelize.options.dialect !== 'postgres') {
          console.log('Not creating search index, must be using POSTGRES to do this');
          return;      
      }

      // var searchFields = ['title', 'description', 'category', 'location', 'username', '"Users"."lastName"', '"Users"."firstName"',];
      var searchFields = ['title', 'description', 'category', 'location'];

      var post_instance = Post;

      var vectorName = post_instance.getSearchVector();
      sequelize
                  .query('CREATE MATERIALIZED VIEW IF NOT EXISTS posts_users_joined AS \
                      SELECT "Posts"."id", to_tsvector(\'english\', ' + searchFields.join(' || \' \' || ') + ') AS PostText\
                      FROM "Posts" \
                      INNER JOIN "Users" \
                      ON "Posts"."UserId" = "Users".id;'
                  )
      .then(function() {
          return sequelize
                  .query('CREATE INDEX IF NOT EXISTS post_search_idx ON posts_users_joined USING gin("' + vectorName + '");')
                  .catch((error) => console.log(error));
      })

      // Function to refresh the materialized view
      // Is executed only when run by a trigger
      // .then(function() {
      //     return sequelize
      //             .query('CREATE OR REPLACE FUNCTION refresh_posts_users_joined() \
      //                 RETURNS TRIGGER LANGUAGE plpgsql \
      //                 AS $$ \
      //                 BEGIN \
      //                     REFRESH MATERIALIZED VIEW posts_users_joined; \
      //                     RETURN NULL; \
      //                 END $$;')
      // })

      // .then(function() {
      //     return sequelize
      //             .query('DROP TRIGGER IF EXISTS post_vector_update ON Posts CASCADE;')
      //             .then(() => {
      //                 // sequelize.query('CREATE TRIGGER post_vector_update BEFORE INSERT OR UPDATE ON "' + post_instance.tableName + '" FOR EACH ROW EXECUTE PROCEDURE refresh_posts_users_joined() RETURN OLD;')
      //                 sequelize.query('CREATE TRIGGER post_vector_update BEFORE INSERT OR UPDATE ON "' + post_instance.tableName + '" FOR EACH ROW EXECUTE PROCEDURE refresh_posts_users_joined();')
      //                 .catch((error) => console.log(error));
      //             })
      //             .catch((error) => {
      //               console.log(error);
      //             });
      // })

      .catch((error) => console.log(error));        
  },

Post.search = (query) => {
    if(sequelize.options.dialect !== 'postgres') {
        console.log('Search is only implemented on POSTGRES database');
        return;
    }

    var post_instance = Post;
    query = sequelize.getQueryInterface().queryGenerator.escape(query);
    console.log(query);
    
    return sequelize
            .query('SELECT id FROM posts_users_joined WHERE "' + post_instance.getSearchVector() + '" @@ plainto_tsquery(\'english\', ' + query + ')', post_instance)
            .then((result) => result)
            .catch((error) => console.log(error));
},





  
  Post.associate = (models) => {
    Post.hasMany(models.Document);
    Post.hasMany(models.Picture);
    Post.hasMany(models.Video);
    Post.hasMany(models.PendingDonation);
    Post.hasMany(models.CompletedDonation);
    Post.belongsTo(models.User);
  };

  return Post;
};
