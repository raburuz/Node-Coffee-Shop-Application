const validarJWT = require('./validate-jwt');
const validateRequest = require('./validateRequest');
const validateAdminRole = require('./validate-role');
const validateAdminCondition = require('./validate-condition');
const validateImages = require('./validateImages');

module.exports = {
      ...validarJWT,
      ...validateRequest,
      ...validateAdminRole,
      ...validateAdminCondition,
      ...validateImages,
};
