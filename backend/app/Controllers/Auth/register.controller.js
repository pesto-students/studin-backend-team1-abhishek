const { authService } = require('../../Services/Auth.service');

const findUserByEmail = async (email) => {
	const user = await User.findOne({
	  email,
	});
	if (!user) {
	  return false;
	}
	return user;
  };
  
  const createUser = async (email, password) => {
	const hashedPassword = await encrypt(password);
	const otpGenerated = generateOTP();
	const newUser = await User.create({
	  email,
	  password: hashedPassword,
	  otp: otpGenerated,
	});
	if (!newUser) {
	  return [false, 'Unable to sign you up'];
	}
	try {
	  await sendMail({
		to: email,
		OTP: otpGenerated,
	  });
	  return [true, newUser];
	} catch (error) {
	  return [false, 'Unable to sign up, Please try again later', error];
	}
  };

const register = async (req, res) => {
	const { email, otp } = req.body;
	const isExisting = await findUserByEmail(email);
	if (isExisting) {
	  return res.send('Already existing');
	}
	// create new user
	const newUser = await createUser(email, otp);
	if (!newUser[0]) {
	  return res.status(400).send({
		message: 'Unable to create new user',
	  });
	}
	res.send(newUser);
  };

module.exports = register;