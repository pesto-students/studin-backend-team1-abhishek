const controllers = require('../../Controllers/Connections');
const express = require('express');
const router = new express.Router();

router.get('/allUsers', controllers.getAllUsers);
router.get('/top5Users', controllers.getTop5Users);
router.get('/myConnRequests', controllers.getMyConnRequests);
router.post('/acceptConnection', controllers.acceptConnectionRequest);
router.post('/addConnection', controllers.addConnection);

// router.get('/allConnections', controllers.getAllConnections)
// router.get('/top5Connections', controllers.getTop5Connections)
// router.get('/connect/:user_id', controllers.getAllConnections);
// router.delete('/connect', controllers.removeConnection);

module.exports = router;
