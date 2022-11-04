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

    const otp = generateOTP();

    const mailOptions = {
      from: 'Studin-admin@gmail.com',
      to: req.body.useremail,
      subject: 'Otp for registration is: ',
      html: '<h3>OTP for account verification is </h3>' +
        '<h1 style=\'font-weight:bold;\'>' +
        otp + '</h1>', // html body
    };

    await transporter.sendMail(mailOptions, async (error, info) => {

      if (error) {
        return console.log(error);
      } else {
        res.json({
          status: 200,
          message: 'Mail sent', messageId: info.envelope.to[0],
        });
        const userIdProper = await User.findOne({
          email: req.body.useremail
        })

        const filter = {
          email: info.envelope.to[0]
        }
        const otpOptions  = {
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
  } catch (error) {
    console.log(error)
    Sentry.captureException(error);
    console.log(`Error occured while sending OTP: ${error}`);
  }
};

module.exports = sendOTP;
