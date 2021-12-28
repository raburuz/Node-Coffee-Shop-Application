const Router = require('express');
const {
      getProducts,
      getProduct,
      postProduct,
      putProduct,
      deleteProduct,
} = require('../controllers/product.controller');
const {
      validateGet,
      validateGetOne,
      validatePost,
      validatePut,
      validateDelete,
} = require('../middlewares/validateProductInputs');

const router = Router();

router.get('/', validateGet, getProducts);
router.get('/:id', validateGetOne, getProduct);
router.put('/:id', validatePut, putProduct);
router.post('/', validatePost, postProduct);
router.delete('/:id', validateDelete, deleteProduct);

module.exports = router;
