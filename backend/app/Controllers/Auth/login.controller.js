const { authService } = require('../../Services/Auth.service');
const Otp = require('../../Models/Otp.model')
const createToken = require('../../Services/Auth.service')

const login = async(req,res) => {
	try {
		let {email,otp} = req.body;
		const user = await Otp.findOne({
			email: email
		});
		if (!user) {
			return [false, 'User not found'];
		}
		console.log(user.otp)
		if (user && user.otp != otp) {
			return [false, 'Invalid OTP'];
		}
		console.log('OTP matches, login successful!')
		let signedJwt = createToken({"email": email})
		console.log(`jwt --> ${signedJwt}`)
		res.status(201).json(signedJwt)
		return
	} catch (error) {
		console.log(error)
		console.log("Error occured at login")
		return
	}
};

module.exports = login;