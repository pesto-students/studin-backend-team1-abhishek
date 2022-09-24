const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;
    //check if json web token exists & is verified
    if (token) {
        jwt.verify(token, 'secret-key-for-jwt-signing-use-from-config-file', (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}


module.exports = { requireAuth };