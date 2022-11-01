const User = require("../../Models/User.model");
const basicLogic = require('../../Helpers/init_graph_bfs');

const getRecommendedConnections = async (req, res) => {
  try {

    let currentUserId = req.user._id;
    let currentUserData = await User.findOne({_id: currentUserId}).populate({
      path: "connections", select: ['email', 'interests', 'schoolName', 'firstName', 'lastName', 'profilePhoto']
    });

    let firstConns = currentUserData.connections;

    let sortedWeightedConns = basicLogic(currentUserData, firstConns);

    res.json({status: 200, data: sortedWeightedConns});
    return;

  } catch (error) {
    return;
  }
};

module.exports = getRecommendedConnections;
