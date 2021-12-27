const { check } = require('express-validator');

const { validarJWT, validateRequest } = require('../middlewares');
const {
      isValidId,
      isValidCategory,
      isValidName,
} = require('../helpers/db-validators');

const validateCategoryPost = [
      validarJWT,
      check('name', 'Name is required')
            .trim()
            .not()
            .isEmpty()
            .custom(isValidName),
      check('condition', 'Condition is required').isBoolean(),
      check('user', 'User Reference is required').isMongoId().custom(isValidId),
      validateRequest,
];

const validateCategoryGet = [
      check('limit', 'Not a valid Limit').optional().isInt(),
      validateRequest,
];

const validateCategoryGetOne = [
      check('id', 'Category id is required')
            .isMongoId()
            .custom(isValidCategory),
      validateRequest,
];

const validateCategoryDelete = [
      validarJWT,
      check('id', 'Category id is required')
            .isMongoId()
            .custom(isValidCategory),
      validateRequest,
];

//TODO
const validateCategoryPut = [
      validarJWT,
      check('id', 'Category id is required')
            .isMongoId()
            .custom(isValidCategory),
      check('name', 'Name is required')
            .trim()
            .not()
            .isEmpty()
            .custom(isValidName),
      validateRequest,
];
module.exports = {
      validateCategoryPost,
      validateCategoryGet,
      validateCategoryGetOne,
      validateCategoryPut,
      validateCategoryDelete,
};
