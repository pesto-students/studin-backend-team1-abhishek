const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

const verifyUserLogin = async(req, res) => {

    try {
        let isExpiredToken = false;
        var dateNow = new Date();
        if (req.cookies.accessToken) {
            const accessToken = req.cookies.accessToken.split(' ')[1];
            await jwt.verify(
            accessToken,
            ACCESS_TOKEN_SECRET_KEY,
            async (err, decodedToken) => {
                try {
                    if (err) res.json({message: 'invalid token', status: 401});
                    const {payload} = decodedToken;
                    if(decodedToken.exp < dateNow.getTime()/1000) {
                        isExpiredToken = true;
                    }

                    if(isExpiredToken === true){
                        Sentry.captureMessage('Invalid user details', 'warning');
                        res.json({message: 'Invalid user details', status: 400});
                    }
                    const currentUser = await User.findOne({
                        email: payload.email
                    });

                    res.json({ message: 'Verified logged in user is active', email: payload.email, userId: currentUser._id, status: 200})
                    return;
                } catch (err) {
                    Sentry.captureException(err);
                    res.json({message:'Try after sometime', status: 401});
                    return;
                }
            }
            )

        } else {
            res
            .json({ message: 'Cookie did not exist for user', status: 401});
        }

        } catch (error) {
            console.log(error);
            Sentry.captureException('Error occured during user login verification')
        }
    
}

module.exports = verifyUserLogin;
