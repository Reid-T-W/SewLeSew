const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController')

const router = Router()


router.get('/api/v1/products', ProductController.getAllProducts)
router.get('/api/v1/search/:query', ProductController.searchProducts)
router.get('/api/v1/users', UserController.getAllUsers)



module.exports = router;




