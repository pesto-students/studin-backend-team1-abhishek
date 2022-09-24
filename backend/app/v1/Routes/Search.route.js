const controllers = require('../../Controllers/Search.controller')
const router = require('express').Router()

router.get('/:searchInput', controllers.smartSearch)

module.exports = router;