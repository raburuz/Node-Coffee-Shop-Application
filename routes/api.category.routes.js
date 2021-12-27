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

router.get('/', validateCategoryGet, getCategories); //ok
router.get('/:id', validateCategoryGetOne, getCategory); //ok
router.put('/:id', validateCategoryPut, putCategory);
router.post('/', validateCategoryPost, postCategories); //ok
router.delete('/:id', validateCategoryDelete, deleteCategory); //ok

module.exports = router;
