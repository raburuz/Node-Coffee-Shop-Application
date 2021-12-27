const { check } = require('express-validator');

const {
      validarJWT,
      validateRequest,
      validateAdminRole,
      validateAdminCondition,
} = require('./index');

const {
      isUniqueEmail,
      isValidRole,
      isValidId,
} = require('../helpers/db-validators');

const validateUserGet = [
      check('limit', 'Not a valid Limit').optional().isInt(),
      check('from', 'Not a valid From').optional().isInt(),
      validateRequest,
];

const validateUserPost = [
      check('name', 'Name is required').trim().not().isEmpty(),
      check('password', 'Password is required')
            .trim()
            .isStrongPassword({
                  minLength: 6,
                  minLowercase: 1,
                  minUppercase: 1,
                  minNumbers: 1,
                  minSymbols: 1,
            })
            .withMessage(
                  'Password must be greater than 6 and contain at least one u Uppercase letter, one Lowercase letter, one Number and one Symbol'
            )
            .not()
            .isEmpty(),
      check('email', 'Not a valid email address')
            .normalizeEmail()
            .isEmail()
            .custom(isUniqueEmail),
      check('role').custom(isValidRole),
      validateRequest,
];

const validateUserPut = [
      check('id', 'Not a valid Id').isMongoId().custom(isValidId),
      check('name', 'Name is required').trim().not().isEmpty(),
      check('email', 'Not a valid email address').normalizeEmail().isEmail(),
      check('role').custom(isValidRole),
      validateRequest,
];
const validateUserDelete = [
      validarJWT,
      validateAdminCondition,
      validateAdminRole,
      check('id', `User account doesn't found or already deleted`)
            .isMongoId()
            .custom(isValidId),
      validateRequest,
];

module.exports = {
      validateUserGet,
      validateUserPost,
      validateUserPut,
      validateUserDelete,
};
