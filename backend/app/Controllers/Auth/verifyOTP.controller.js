const { authService } = require('../../Services/Auth.service');

const validateUserSignUp = async (email, otp) => {
	const user = await User.findOne({
	  email,
	});
	if (!user) {
	  return [false, 'User not found'];
	}
	if (user && user.otp !== otp) {
	  return [false, 'Invalid OTP'];
	}
	const updatedUser = await User.findByIdAndUpdate(user._id, {
	  $set: { active: true },
	});
	return [true, updatedUser];
  };

verifyEmail = async (req, res) => {
	const { email, otp } = req.body;
	const user = await validateUserSignUp(email, otp);
	res.send(user);
  };

verifyOTP = async() => {

};

module.exports = verifyOTP;