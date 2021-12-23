const validarJWT = require('./validate-jwt');
const validateRequest = require('./validateRequest');
const validateAdminRole = require('./validate-role');
const validateAdminCondition = require('./validate-condition');

module.exports = {
      ...validarJWT,
      ...validateRequest,
      ...validateAdminRole,
      ...validateAdminCondition,
};
