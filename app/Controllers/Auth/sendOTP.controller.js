const transporter = require('../../Helpers/init_emailerOTP_gmail');
const Otp = require('../../Models/Otp.model');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');

const generateOTP = () => {
  let otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(`OTP created --> ${otp}`);
  return otp;
};

const sendOTP = async (req, res) => {
  try {
    // let currentUser = await User.findOne({email: email})
    const otp = generateOTP();
    // send mail with defined transport object
    const mailOptions = {
      from: 'Studin-admin@gmail.com',
      to: req.body.useremail,
      subject: 'Otp for registration is: ',
      html: '<h3>OTP for account verification is </h3>' +
        '<h1 style=\'font-weight:bold;\'>' +
        otp + '</h1>', // html body
    };

    // const existingOtp = await Otp.findOne({
    //   email: req.body.useremail 
    //   // userId: userIdProper._id,
    // })
    // if (!existingOtp) {
    await transporter.sendMail(mailOptions, async (error, info) => {
      // console.log('here');
      if (error) {
        return console.log(error);
      } else {
        // console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json({
          status: 200,
          message: 'Mail sent', messageId: info.envelope.to[0],
        });
        const userIdProper = await User.findOne({
          email: req.body.useremail
        })
        // console.log('Proper user id -->', userIdProper);
        const filter = {
          email: info.envelope.to[0]
        }
        const otpOptions  = {
          // userId: userIdProper ? userIdProper._id : '',
          email: info.envelope.to[0],
          otp: otp
        }
        if (userIdProper){
          otpOptions.userId = userIdProper._id
        }
        const otpRes = await Otp.findOneAndUpdate(filter, otpOptions, {
          new: true, 
          upsert: true
        });
        console.log(`OTP Res --> ${otpRes}`);
        return;
      }
    });
    // } else {
    //   res.json({status: 200, message: 'Mail already sent, Please check your inbox!'});
    //   return;
    // }
  } catch (error) {
    console.log(error)
    Sentry.captureException(error);
    console.log(`Error occured while sending OTP: ${error}`);
  }
};

module.exports = sendOTP;
