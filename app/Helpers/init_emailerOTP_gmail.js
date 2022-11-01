const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const Sentry = require('@sentry/node');

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URI, GMAIL_REFRESH_TOKEN} = process.env;

const oAuth2Client =  new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: GMAIL_REFRESH_TOKEN});

const fetchGoogleAccess = async () => {
  try {

    let accessToken = await oAuth2Client.getAccessToken();
    // console.log('access token is ready');
    return accessToken;

  } catch (error) {
    Sentry.captureException(error);
    console.log('error in nodemailer',error);
    return error;

  }
}

const accessToken = fetchGoogleAccess();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'studin.app@gmail.com',
    clientId: GMAIL_CLIENT_ID,
    clientSecret: GMAIL_CLIENT_SECRET,
    refreshToken: GMAIL_REFRESH_TOKEN,
    accessToken: accessToken
  }
});
console.log('transporter is ready');

module.exports = transporter;
