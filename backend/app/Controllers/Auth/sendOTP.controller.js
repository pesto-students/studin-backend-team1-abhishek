// const { authService } = require('../../Services/Auth.service');
const transporter = require('../../helpers/init_emailerOTP')
const Otp = require('../../Models/Otp.model');

const generateOTP = () => {
	var otp = Math.random();
	otp = otp * 1000000;
	otp = parseInt(otp);
	console.log(`OTP created --> ${otp}`);
	return otp;
}

const sendOTP =  async (req, res) => {
	try{
		// let currentUser = await User.findOne({email: email})
		// let receiver = req.body.email;
		let otp = generateOTP();
		// send mail with defined transport object
		var mailOptions = {
			from: 'Studin-admin@gmail.com',
			to: req.body.email,
			subject: "Otp for registration is: ",
			html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
		};

		await transporter.sendMail(mailOptions, async (error, info) => {
			console.log('here')
			if (error) {
				return console.log(error);
			}else {
				console.log('Message sent: %s', info.messageId);
				// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
				res.status(200).send({message: "Mail sent", messageId: info.messageId})
				
				let otpRes = await Otp.create({
					email: info.envelope.to,
					otp: otp
				})
				console.log(`OTP Res --> ${otpRes}`)
				// res.render('otp');
				return
			}
		});
	} catch(error) {
		console.log(`Error occured while sending OTP: ${error}`)
	}
};

module.exports = sendOTP
