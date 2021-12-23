const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { validateLogin } = require('../middlewares/validateAuthInputs');

const router = Router();

router.get('/');
router.post('/login', validateLogin, login);
router.put('/');
router.delete('/');

module.exports = router;
