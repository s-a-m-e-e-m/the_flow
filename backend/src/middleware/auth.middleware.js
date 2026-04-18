const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

const authUser = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "token not found"
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "expired token."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;

        next()
    } catch (error) {

        return res.status(401).json({
            message: "invalid token"
        })
    }
}

module.exports = { authUser }