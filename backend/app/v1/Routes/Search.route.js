const controllers = require('../../Controllers/Search.controller');
const express = require('express');
const router = new express.Router();

router.get('/:searchInput', controllers.smartSearch);

module.exports = router;
