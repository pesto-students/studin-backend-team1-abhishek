// const { profileService } = require('../services/Profile.service');
const User = require('../Models/User.model')

const getMyProfileSummary = async(req,res) => {
	try {
		console.log("Inside profile summary")
		const {body} = req;
		const currentUser = await User.findOne({
			email: body.email
		})
		// const allPosts = await Post.find({
		// 	user_id: currentUser._id
		// })
		// console.log(`Current user --> ${currentUser}`)
		res.status(200).send({status: "OK", data: currentUser})
		return
		// res.status(200).send("Get all posts for current user");
	} catch (error) {
		console.log(error)
		console.log('Error occured when retrieving all posts')
		return
	}
};

const getMyProfileDetails = async(req,res) => {
	try {
		return
	} catch (error) {
		return
	}
};

const updateMyProfileDetails = async(req,res) => {
	try {
		return
	} catch (error) {
		return
	}
};

const getAllConnectionsDetails = async(req,res) => {
	try {
		return
	} catch (error) {
		return
	}
};

const getConnectionDetails = async(req,res) => {
	try {
		return
	} catch (error) {
		return
	}
};

module.exports = {
    getMyProfileSummary,
    getMyProfileDetails,
    updateMyProfileDetails,
    getAllConnectionsDetails,
    getConnectionDetails
};