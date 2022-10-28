
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} = process.env;

const properties = {
  access: {
    options: {
      // expiresIn: "1 hour",
      expiresIn: "1 day",
    },
    secretKey: ACCESS_TOKEN_SECRET_KEY,
  },

  refresh: {
    options: {
      expiresIn: "1 day",
    },
    secretKey: REFRESH_TOKEN_SECRET_KEY,
  },
};

const createToken = (payload, tokenType) => {
  const {options, secretKey} = properties[tokenType];
  console.log(payload);
  return jwt.sign({payload}, secretKey, options);
};

module.exports = createToken;
