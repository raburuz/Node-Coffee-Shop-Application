const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth.controller');
const {
      validateLogin,
      validateGoogleLogin,
} = require('../middlewares/validateAuthInputs');

const router = Router();

router.post('/login', validateLogin, login);
router.post('/google', validateGoogleLogin, googleSignIn);

module.exports = router;
