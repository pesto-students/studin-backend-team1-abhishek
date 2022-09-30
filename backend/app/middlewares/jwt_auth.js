const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // const token = req.cookies.jwt;
    //check if json web token exists & is verified
    if (token) {
        jwt.verify(token, tokenSecret, (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                // console.log(decodedToken);
                console.log('token-is-valid!')
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}


module.exports = { requireAuth };