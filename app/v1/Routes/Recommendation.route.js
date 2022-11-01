const controllers = require('../../Controllers/Recommendations');
const express = require('express');
const router = new express.Router();

router.get('/recommendedConnections',
    controllers.getRecommendedConnections);

// router.get('/recommendedConnectionsTop5/:user_id',
//     controllers.getRecommendedConnectionsTop5);

module.exports = router;
