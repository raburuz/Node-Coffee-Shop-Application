const { check } = require('express-validator');
const { validateRequest } = require('./validateRequest');

const validateLogin = [
      check('email', 'Email address is required').normalizeEmail().isEmail(),

      check('password', 'Password is required').not().isEmpty(),
      validateRequest,
];

const validateGoogleLogin = [
      check('id_token', 'Id_token is required').not().isEmpty(),

      validateRequest,
];

module.exports = {
      validateLogin,
      validateGoogleLogin,
};
