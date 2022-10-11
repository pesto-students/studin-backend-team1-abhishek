// const {connectionService} = require('../services/Connections.service');

const getConnections = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await connectionService.usefulService(id);
    res.json(post);
    return;
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

const addConnection = async (req, res) => {
  try {
    return;
  } catch (error) {
    return;
  }
};

const removeConnection = async (req, res) => {
  try {
    return;
  } catch (error) {
    return;
  }
};

module.exports = {
  getConnections,
  addConnection,
  removeConnection,
};
