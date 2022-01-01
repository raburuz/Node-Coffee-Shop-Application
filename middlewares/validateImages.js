const { check } = require('express-validator');
const { isValidIdForUpdate } = require('./isValidIdForUpdate');
const { validarJWT } = require('./validate-jwt');
const { validateFile } = require('./validateFile');
const { validateRequest } = require('./validateRequest');

const validateUploadFiles = [validarJWT, validateFile, validateRequest];

const validateImages = [
      validarJWT,
      validateFile,
      check('id', 'Id is required').isMongoId(),
      isValidIdForUpdate,
      validateRequest,
];

const validateGetImagen = [
      validarJWT,
      check('id', 'Id is required').isMongoId(),
      isValidIdForUpdate,
      validateRequest,
];
module.exports = {
      validateUploadFiles,
      validateImages,
      validateGetImagen,
};
