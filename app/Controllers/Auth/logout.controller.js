const Sentry = require('@sentry/node');

const logout = async (req, res) => {
  try {

      if (req.cookies.accessToken) {

        await res.clearCookie("accessToken");
        console.log("Logout initiated");

        res.json({ message: "User Logged Out Successfully" , status: 200});
        return;
      } else {
        return res.json({ message: "Please login first!", status: 200});
      }
  } catch (error) {
    Sentry.captureException('Error occured during logout');
    Sentry.captureException(error);
    return;
  }
};

module.exports = logout;
