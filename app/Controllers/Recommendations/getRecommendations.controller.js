const User = require("../../Models/User.model");
const basicLogic = require('../../Helpers/init_graph_bfs');

const getRecommendedConnections = async (req, res) => {
  try {

    let currentUserId = req.user._id;
    let currentUserData = await User.findOne({
      _id: currentUserId
    }).populate({
      path: "connections", select: ['email', 'interests', 'schoolName', 'firstName', 'lastName', 'profilePhoto']
    });

    if (currentUserData.connections.length !== 0){
      //user with connections > 0
      let firstConns = currentUserData.connections;

      let sortedWeightedConns = basicLogic(currentUserData, firstConns);

      res.json({status: 200, data: sortedWeightedConns});

    } else {
      //user with connections = 0
      const allUsers = await User.find({
        _id: { $ne: currentUserId }
      });

      res.json({status: 200, data: allUsers});
    }

    return;

  } catch (error) {
    return;
  }
};

module.exports = getRecommendedConnections;
