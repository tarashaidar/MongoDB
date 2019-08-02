const express = require('express');
const router = express.Router();
const controller = require('../controllers/article');

router.get('/', controller.getAllArticles);
router.post('/', controller.createArticle);
router.put('/:id', controller.updateArticle);
router.delete('/:id', controller.deleteArticle);

module.exports = router;

