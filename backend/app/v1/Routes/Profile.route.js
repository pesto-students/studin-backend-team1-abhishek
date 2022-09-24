const controllers = require('../../Controllers/Profile.controller')
const router = require('express').Router()

router.put('/profileDetails', controllers.updateMyProfileDetails);

router.get('/profileSummary', controllers.getMyProfileSummary)
router.get('/profileDetails', controllers.getMyProfileDetails)

router.get('/allConnections', controllers.getAllConnectionsDetails);
router.get('/connection/:user_id', controllers.getConnectionDetails);

module.exports = router;