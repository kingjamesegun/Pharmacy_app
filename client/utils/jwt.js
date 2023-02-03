const jwt = require("jsonwebtoken")

const createJWT = ({payload}) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
}
const isTokenValid = token => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({res, user, refreshToken}) => {
    const accessEcommerceJWT = createJWT({payload: {user}})
    const refreshEcommerceJWT = createJWT({payload:{user, refreshToken}})
    
    const fifteenDays = 1000 * 24 * 60 * 60 * 15;
    const longerDay = 1000 * 24 * 60 * 60 * 30;

    res.cookie("accessApp", accessEcommerceJWT, {
        httpOnly: true,
        signed: true,
        // secure: //process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + fifteenDays),
    } );
    res.cookie("refreshApp", refreshEcommerceJWT, {
        httpOnly: true,
        signed: true,
        // secure: //process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + longerDay),
    } );
}

module.exports = {
    attachCookiesToResponse,
    isTokenValid
}