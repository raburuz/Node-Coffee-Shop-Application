const { check } = require('express-validator');
const { validateRequest } = require('./validateRequest');
const {
      isValidProduct,
      isValidId,
      isValidCategory,
      isValidNameProduct,
} = require('../helpers/db-validators');
const { validarJWT } = require('./validate-jwt');
const { validateAdminRole } = require('./validate-role');
const { isValidNameProductPUT } = require('./validateNameProductPUT');

const validateGet = [
      check('limit', 'Not a valid Limit').optional().isInt(),
      validateRequest,
];

const validateGetOne = [
      check('id', 'Id is required').isMongoId().custom(isValidProduct),
      validateRequest,
];

const validatePost = [
      validarJWT,
      check('name', 'Name is required')
            .trim()
            .not()
            .isEmpty()
            .custom(isValidNameProduct),
      check('price', 'Not a valid Price').isNumeric().optional(),
      check('user', 'Not a valid User').isMongoId().custom(isValidId),
      check('category', 'Not a valid Category')
            .isMongoId()
            .custom(isValidCategory),
      check('description', 'Something was wrong with the description')
            .optional()
            .isString(),
      validateRequest,
];

const validatePut = [
      validarJWT,
      check('id', 'Id is required').isMongoId().custom(isValidProduct),
      check('name', 'Name is required').trim().not().isEmpty(),
      isValidNameProductPUT,
      check('price', 'Not a valid Price').isNumeric().optional(),
      check('category', 'Not a valid Category')
            .isMongoId()
            .custom(isValidCategory),
      check('description', 'Something was wrong with the description')
            .optional()
            .isString(),
      validateRequest,
];

const validateDelete = [
      validarJWT,
      validateAdminRole,
      check('id', 'Id is required').isMongoId().custom(isValidProduct),
      validateRequest,
];

module.exports = {
      validateGet,
      validateGetOne,
      validatePut,
      validateDelete,
      validatePost,
};
