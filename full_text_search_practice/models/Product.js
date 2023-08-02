const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {}
    )

    Product.getSearchVector = () => {
        return 'producttext';
    },

    Product.addFullTextIndex = () => {
        if(sequelize.options.dialect !== 'postgres') {
            console.log('Not creating search index, must be using POSTGRES to do this');
            return;      
        }

        var searchFields = ['name', 'quantity', 'username'];
        var product_instance = Product;
        // var view_instance = "products_users_joined";

        var vectorName = product_instance.getSearchVector();
        sequelize
                    .query('CREATE MATERIALIZED VIEW IF NOT EXISTS products_users_joined AS \
                        SELECT "Products"."id", to_tsvector(\'english\', ' + searchFields.join(' || \' \' || ') + ') AS ProductText\
                        FROM "Products" \
                        INNER JOIN "Users" \
                        ON "Products"."UserId" = "Users".id;'
                    )
        .then(function() {
            return sequelize
                    .query('CREATE INDEX IF NOT EXISTS product_search_idx ON products_users_joined USING gin("' + vectorName + '");')
                    .catch((error) => console.log(error));
        })

        // Function to refresh the materialized view
        // Is executed only when run by a trigger
        .then(function() {
            return sequelize
                    .query('CREATE OR REPLACE FUNCTION refresh_products_users_joined() \
                        RETURNS TRIGGER LANGUAGE plpgsql \
                        AS $$ \
                        BEGIN \
                            REFRESH MATERIALIZED VIEW CONCURRENTLY products_users_joined; \
                            RETURN NULL; \
                        END $$;')
        })

        .then(function() {
            return sequelize
                    .query('DROP TRIGGER IF EXISTS product_vector_update ON Products CASCADE;')
                    .then(() => {
                        sequelize.query('CREATE TRIGGER product_vector_update BEFORE INSERT OR UPDATE ON "' + product_instance.tableName + '" FOR EACH ROW EXECUTE PROCEDURE refresh_products_users_joined();')
                        .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));        
    },

    Product.search = (query) => {
        if(sequelize.options.dialect !== 'postgres') {
            console.log('Search is only implemented on POSTGRES database');
            return;
        }

        var product_instance = Product;
        query = sequelize.getQueryInterface().queryGenerator.escape(query);
        console.log(query);
        
        return sequelize
                .query('SELECT id FROM products_users_joined WHERE "' + product_instance.getSearchVector() + '" @@ plainto_tsquery(\'english\', ' + query + ')', product_instance)
                .then((result) => result)
                .catch((error) => console.log(error));
    },

    Product.associate = (model) => {
        Product.belongsTo(model.User);
    };

    return Product;
}