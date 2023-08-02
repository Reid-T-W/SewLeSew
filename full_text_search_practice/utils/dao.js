const models = require('../models/index');

async function getAllProducts() {
    const dbProducts = await models.Product.findAll({
        include: [ models.User],
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    return dbProducts;
}

async function getProductByParam(param) {
    const dbProduct = await models.Product.findOne({
        where: param,
        include: [ models.User],
    });
    return dbProduct;
}


async function getAllUsers() {
    const dbUsers = await models.User.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
    });

    return dbUsers;
}

async function searchProducts(query) {
    const searchedProducts = await models.Product.search(query);
    return searchedProducts;
}

module.exports = {
    getAllProducts,
    getAllUsers,
    searchProducts,
    getProductByParam,
}

