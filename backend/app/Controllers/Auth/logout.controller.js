const Sentry = require('@sentry/node');

const logout = async (req, res) => {
  try {

      if (req.cookies.accessToken) {
        // await req.session.destroy();
        // await res.clearCookie("connect.sid");
        await res.clearCookie("accessToken");
        // res.clearCookie("refreshToken");
        res.json({ message: "User Logged Out Successfully" , status: 200});
        return;
      } else {
        return res.json({ message: "Please login first!", status: 400});
      }
  } catch (error) {
    Sentry.captureException('Error occured during logout');
    Sentry.captureException(error);
    return;
  }
};

module.exports = logout;
