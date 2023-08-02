const models = require('../models/index');
const _PRODUCT = require('./productSeed.json');
const _USER = require('./userSeed.json');


module.exports = {
  insert: () => {
    models.User.bulkCreate(_USER)
      .then(() => {
        models.Product.bulkCreate(_PRODUCT)
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
