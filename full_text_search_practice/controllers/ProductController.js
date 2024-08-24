const { getAllProducts, searchProducts, getProductByParam, addProduct } = require('../utils/dao');

class ProductController {
    static async getAllProducts(req, res) {
        const dbProducts = await getAllProducts();
        return res.status(200).json(dbProducts);
    }

    static async searchProducts(req, res) {
        // Extracting the query from the req object
        const { query } = req.params;
        console.log(query)
        // const query = "30 samsung"
        const searchedProducts = await searchProducts(query);
        console.log(searchedProducts[0])
        let products = []
        for (let productId of searchedProducts[0]) {
            const product = await getProductByParam(productId);
            products.push(product)
        }
        // const products = await getSearchedProducts(searchedProducts[0]);
        return res.status(200).json(products);
    }

    static async addProduct(req, res) {
        const { name, description, price, quantity } = req.body;
        // 2 represents the default user id
        const product = await addProduct({name, description, price, quantity, "UserId":2});
        return res.status(200).json(product);
    }
} 

module.exports = ProductController;

