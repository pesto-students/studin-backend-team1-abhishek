const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET;
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    console.log(id)

    return jwt.sign(id, tokenSecret, {
        expiresIn: maxAge
    });
}

module.exports = createToken
