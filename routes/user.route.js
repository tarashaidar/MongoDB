const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');

router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getUser);
router.delete('/:id', controller.deleteUser);
router.get('/:id/articles', controller.getUserArticles);
router.get('/', controller.getAllUsers);





module.exports = router;