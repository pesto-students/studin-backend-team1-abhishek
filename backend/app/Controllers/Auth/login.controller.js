const { authService } = require('../../Services/Auth.service');
const Otp = require('../../Models/Otp.model')
const User = require('../../Models/User.model')
const createToken = require('../../Services/Auth.service')

const login = async (req, res) => {
	try {
		console.log(req.body)
		let { email, otp } = req.body;
		const user = await Otp.findOne({
			email:email
		});
		if (!user) {
			return [false, 'User not found'];
		}
		console.log(user)
		if (user && user.otp !== otp) {
			console.log("executed")
			return [false, 'Invalid OTP'];
		} else {
			const preuser = await User.findOne({ email: email })
			console.log(preuser)
			if (preuser) {
				let signedJwt = createToken({ "email": email })
				console.log(`jwt --> ${signedJwt}`)
				res.status(201).json({ status: 201, signedJwt })
			} else {
				res.status(400).json({ status: 400 })
			}
		}
		console.log('OTP matches, login successful!')
		return
	}
	catch (error) {
		res.status(400).json({ status: 400 })
    return
	}
};

module.exports = login;