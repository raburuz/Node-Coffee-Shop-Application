const { check } = require('express-validator');
const { validateRequest } = require('./validateRequest');
const { isValidProduct } = require('../helpers/db-validators');
const { validarJWT } = require('./validate-jwt');
const { validateAdminRole } = require('./validate-role');

const validateGet = [
      check('limit', 'Not a valid Limit').optional().isIn(),
      validateRequest,
];

const validateGetOne = [
      check('id', 'Id is required').isMongoId().custom(isValidProduct),
      validateRequest,
];

const validatePost = [
      validarJWT,
      check('name', 'Name is required'),
      check('price', 'Not a valid Price'),
      check('user', 'Not a valid User'),
      check('category', 'Not a valid Category'),
      check('description', 'Description is required'),

      validateRequest,
];

const validatePut = [
      validarJWT,
      check('id', 'Id is required').isMongoId().custom(isValidProduct),
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
};
