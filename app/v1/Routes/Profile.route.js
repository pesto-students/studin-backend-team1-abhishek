const controllers = require('../../Controllers/Profile.controller');
const express = require('express');
const router = new express.Router();

router.put('/profileDetails', controllers.updateMyProfileDetails);

router.post('/profileSummary', controllers.getMyProfileSummary);
router.get('/profileDetails', controllers.getMyProfileDetails);

router.get('/allConnections', controllers.getAllConnectionsDetails);
router.get('/connection/:user_id', controllers.getConnectionDetails);

module.exports = router;
