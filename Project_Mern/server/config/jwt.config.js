const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const authenticate = (req, res, next) => {
    console.log("Running Authentication on The User from Jwt.Config");
    jwt.verify(req.cookies.userToken, SECRET, (error, payload) => {
        if(error) {
            console.log("User NOT ALLOWED TO BE HERE");
            res.status(401).json({isVerified:false ,error})
        } else {
            next()
        }
    })
}

module.exports = authenticate