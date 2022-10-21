const getAllUsers = require('./getAllUsers.controller');
const getTop5Users = require('./getTop5Users.controller');
const getAllConnections = require('./getAllConnections.controller');
const getTop5Connections = require('./getTop5Connections.controller');
const addConnection = require('./addConnection.controller');
const getMyConnRequests = require('./getMyConnRequests.controller');
const acceptConnectionRequest = require('./acceptConnectionRequest.controller');

module.exports = {
    getAllUsers,
    getTop5Users,
    getAllConnections,
    getTop5Connections,
    addConnection,
    getMyConnRequests,
    acceptConnectionRequest
};
