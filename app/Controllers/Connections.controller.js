
const getAllConnections = async (req, res) => {
  try {
    const id = req.params.id;
    const allConnections = await 
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
  getAllConnections,
  addConnection,
  removeConnection,
};
