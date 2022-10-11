const controllers = require('../../Controllers/Connections.controller');
const express = require('express');
const router = new express.Router();

// router.get('/', controllers.allConnections)
// router.post('/', controllers.createConnection)

router.get('/connect/:user_id', controllers.getConnections);
router.post('/connect', controllers.addConnection);
router.delete('/connect', controllers.removeConnection);

module.exports = router;
