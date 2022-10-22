const User = require('../Models/User.model')

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
  try {
    if (!req.body) {
      res.status(400).send('Insufficient data');
  }

  const {
      userId, firstName, lastName, schoolName, collegeName, interests,
  } = req.body;
  const { profilePhoto, coverPhoto } = req.files;
  console.log(req.user)

  const imageResult = await cloudinary.uploader.upload(profilePhoto.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
      folder: 'studin/users-profile-images',
  });

  const imageResult2 = await cloudinary.uploader.upload(coverPhoto.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
      folder: 'studin/users-cover-images',
  });

  const payload = {
      email: userId,
      firstName: firstName,
      lastName: lastName,
      schoolName: schoolName,
      collegeName: collegeName,
      interests: interests,
      profilePhoto: imageResult.secure_url,
      coverPhoto: imageResult2.secure_url,
  };
  const updateuser = await User.findByIdAndUpdate(req.user._id, payload, {
      new: true
  });
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
