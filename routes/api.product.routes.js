const Router = require('express');
const { getProducts } = require('../controllers/product.controller');

const router = Router();

router.get('/', validateGet, getProducts);
router.get('/:id');
router.put('/:id');
router.post('/');
router.delete('/:id');

module.exports = router;
