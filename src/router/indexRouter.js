const router = require('express').Router();

const index = require('../controllers/index.controller');

router.use('/', index);

module.exports = router;