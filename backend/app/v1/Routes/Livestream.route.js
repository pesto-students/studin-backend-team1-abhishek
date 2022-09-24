const controllers = require('../../Controllers/Livestream.controller')
const router = require('express').Router()

router.get('/start/:user_id', controllers.startLiveStream)
router.get('/stop/:user_id', controllers.stopLiveStream)

module.exports = router;