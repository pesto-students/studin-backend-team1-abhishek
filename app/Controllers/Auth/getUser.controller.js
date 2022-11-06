const User = require('../../Models/User.model');

const getUser = async (req, res) => {
  try {
    console.log('Fetching all users');
    const data = await User.find();

    // console.log(data)
    res.json({status: 200, data: data});
    return;
  } catch (error) {
    return;
  }
};

module.exports = getUser;
