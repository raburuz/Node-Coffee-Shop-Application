const { Router } = require('express');
const {
      uploadImages,
      uploadText,
      updateImage,
      getImage,
      updateImageClouddinary,
} = require('../controllers/upload.controller');
const {
      validateImages,
      validateUploadFiles,
      validateGetImagen,
} = require('../middlewares');
const router = Router();

router.post('/images', validateUploadFiles, uploadImages);
router.post('/text', validateUploadFiles, uploadText);
router.post('/:collection/:id', validateImages, updateImageClouddinary);
router.get('/:collection/:id', validateGetImagen, getImage);
module.exports = router;
