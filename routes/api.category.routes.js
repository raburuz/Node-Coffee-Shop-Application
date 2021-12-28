const { Router } = require('express');
const {
      getCategories,
      postCategories,
      getCategory,
      deleteCategory,
      putCategory,
} = require('../controllers/category.controller');
const {
      validateCategoryPost,
      validateCategoryGet,
      validateCategoryGetOne,
      validateCategoryPut,
      validateCategoryDelete,
} = require('../middlewares/validateCategoryInputs');

const router = Router();

router.get('/', validateCategoryGet, getCategories);
router.get('/:id', validateCategoryGetOne, getCategory);
router.put('/:id', validateCategoryPut, putCategory);
router.post('/', validateCategoryPost, postCategories);
router.delete('/:id', validateCategoryDelete, deleteCategory);

module.exports = router;
