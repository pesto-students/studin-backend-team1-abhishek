const User = require('../Models/User.model');
const cloudinary = require('../Helpers/init_cloudinary');

const getMyProfileSummary = async (req, res) => {
	try {
		console.log("Inside profile summary")
		const { body } = req;
		const currentUser = await User.findOne({
			email: body.email
		})
		// const allPosts = await Post.find({
		// 	user_id: currentUser._id
		// })
		// console.log(`Current user --> ${currentUser}`)
		res.status(200).send({ status: "OK", data: currentUser })
		return
		// res.status(200).send("Get all posts for current user");
	} catch (error) {
		console.log(error)
		console.log('Error occured when retrieving all posts')
		return
	}
};

const getMyProfileDetails = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
   console.log(error)
  }
};

const updateMyProfileDetails = async (req, res) => {
  console.log("update data details");
  try {
    
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
    // profilePhoto: imageResult.secure_url,
    // coverPhoto: imageResult2.secure_url,
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
  res.status(200).json(updateuser);
  } catch (error) {
    return;
  }
};

const getAllConnectionsDetails = async (req, res) => {
	try {
		return
	} catch (error) {
		return
	}
};

const getConnectionDetails = async (req, res) => {
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
