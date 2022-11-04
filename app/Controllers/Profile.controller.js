const User = require('../Models/User.model');
const cloudinary = require('../Helpers/init_cloudinary');

const getMyProfileSummary = async (req, res) => {
	try {
		console.log("Inside profile summary")
		const { body } = req;
		const currentUser = await User.findOne({
			email: body.email
		});
		res.status(200).send({ status: "OK", data: currentUser })
		return
	} catch (error) {
		console.log(error)
		console.log('Error occured when retrieving all posts')
		return
	}
};

const getMyProfileDetails = async (req, res) => {
	try {

		const user = await User.findById(req.user._id).populate("posts", "imageUrl")
		res.json(user)
	} catch (error) {
		console.log(error)
	}
};

const updateMyProfileDetails = async (req, res) => {
	console.log("update data details");
	try {
		console.log("entering put request");
		const {
		firstName, lastName, schoolName, collegeName, interests,
		} = req.body;
	
		if(req.files){
			var file = req.files.profilePhoto;
			var file1=req.files.coverPhoto;
		}
	
		const payload = {
		firstName: firstName,
		lastName: lastName,
		schoolName: schoolName,
		collegeName: collegeName,
		interests: interests,
		};
		console.log(payload);
		if(file !==undefined){
			var imageResult = await cloudinary.uploader.upload(file.tempFilePath, {
				public_id: `${Date.now()}`,
				resource_type: 'auto',
				folder: 'studin/users-profile-images',
			});
			payload.profilePhoto=imageResult.secure_url
		}
		if(file1 !== undefined){
			var imageResult2 = await cloudinary.uploader.upload(file1.tempFilePath, {
				public_id: `${Date.now()}`,
				resource_type: 'auto',
				folder: 'studin/users-cover-images',
			});
			payload.coverPhoto=imageResult2.secure_url
		}
		console.log(imageResult2);
		const updateuser = await User.findByIdAndUpdate(req.user._id, payload, {
			new: true
		});
		console.log(updateuser)
		res.json({status: 200, data: updateuser});
	} catch (error) {
	  return;
	}
  };

const getAllConnectionsDetails = async (req, res) => {
	try {
		const allconnections = await User.findById(req.user._id).populate("connections", "_id firstName lastName profilePhoto schoolName connections posts")
		// console.log('allconnections --> ', allconnections);
		res.status(200).json({ allconnections });

	} catch (error) {
		console.log(error)
	}
};

const getConnectionDetails = async (req, res) => {
	try {
		const connection = req.params;
		const userdata = await User.findById({ _id: connection.user_id }).populate("connections", "_id firstName lastName profilePhoto schoolName connections posts")
		res.status(200).json(userdata)
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
