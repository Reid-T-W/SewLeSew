const { getAllProducts, searchProducts, getProductByParam } = require('../utils/dao');

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
} 

module.exports = ProductController;

