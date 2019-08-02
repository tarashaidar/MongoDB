const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');
const articleRoute = require('./article.route');

router.use('/users', userRoute);
router.use('/articles', articleRoute);

module.exports = router;
