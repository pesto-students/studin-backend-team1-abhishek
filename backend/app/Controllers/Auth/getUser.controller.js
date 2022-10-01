const { authService } = require('../../Services/Auth.service');
const User = require('../../Models/User.model')

const getUser = async (req,res) => {
	try {
        console.log('entered in create')
		let data = await User.find()
        console.log('completed data creation')
        // console.log(data)
        res.status(200).send(data)
		return
	} catch (error) {
		return
	}
};

module.exports = getUser;