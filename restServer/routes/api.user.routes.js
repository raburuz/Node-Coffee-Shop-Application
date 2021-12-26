const { Router } = require('express');

const router = Router();

const {
      validateUserGet,
      validateUserPost,
      validateUserPut,
      validateUserDelete,
} = require('../middlewares/validateUserInputs');

const {
      getUser,
      postUser,
      putUser,
      deleteUser,
} = require('../controllers/api.controller');

router.get('/', validateUserGet, getUser);
router.put('/:id', validateUserPut, putUser);
router.post('/', validateUserPost, postUser);
router.delete('/:id', validateUserDelete, deleteUser);

router.get('*', function (req, res) {
      res.status('404').send('Error 404');
});

module.exports = router;
