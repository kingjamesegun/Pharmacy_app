const CustomError = require("../errors")
const utils = require("../utils")
const Token = require("../models/token")

const authenticationMiddleware = async (req, res, next) => {    
    try {
        const {accessApp, refreshApp} = req.signedCookies;
        if(accessApp){
            const payload = utils.isTokenValid(accessApp);
            req.user = payload.user;
            return next();
        }
        const payload = utils.isTokenValid(refreshApp);
        const existingToken = await Token.findOne({user: payload.user.userId, refreshToken: payload.refreshToken})
        if (!existingToken || !existingToken?.isValid){
            throw new CustomError.UnAuthenticatedError("Authentication failed")
        }
        utils.attachCookiesToResponse({res, user: payload.user, refreshtoken: existingToken.refreshToken})
        req.user = payload.user;
        return next();
    } catch (error) {
        throw new CustomError.UnAuthenticatedError("Authentication failed")
    }
}
const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new CustomError.UnAuthorizedError("You are not authorized to access this route")
        }
        next();
    }
}

module.exports = {
    authenticationMiddleware,
    authorizePermission
}