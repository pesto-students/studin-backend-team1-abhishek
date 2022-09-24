const controllers = require('../../Controllers/Recommendation.controller')
const router = require('express').Router()

router.get('/recommendedConnections/:user_id', controllers.getRecommendedConnections)
router.get('/recommendedConnectionsTop5/:user_id', controllers.getRecommendedConnectionsTop5)

module.exports = router;