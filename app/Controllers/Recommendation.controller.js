const User = require("../Models/User.model");
const basicLogic = require('../Helpers/init_graph_bfs');

const getRecommendedConnections = async (req, res) => {
  try {

    //currentUser
    let currentUserId = req.user._id;
    let currentUserData = await User.findOne({_id: currentUserId}).populate({
      path: "connections", select: ['email', 'interests', 'schoolName']
    });
    let firstConns = currentUserData.connections;

    let weightedConns = basicLogic(currentUserData, firstConns);

    return weightedConns;

  } catch (error) {
    return;
  }
};

const getRecommendedConnectionsTop5 = async (req, res) => {
  try {
    return;
  } catch (error) {
    return;
  }
};

module.exports = {
  getRecommendedConnections,
  getRecommendedConnectionsTop5,
};
