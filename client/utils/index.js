const sendVerificationCode = require("./sendVerificationMail")
const sendResetPasswordEmail = require("./sendResetPasswordMail")
const sendNotificationEmail = require("./sendNotificationEmail");
const sendContactUsEmail = require("./sendContactUsEmail");
const sendSuccessfulOrdersEmail = require("./sendSuccessOrderMail");
const sendTrackingNumberEmail = require("./sendTrackingNumberMail");
const CreateToken = require("./createToken")
const CreateHash = require("./createHash")
const {attachCookiesToResponse, isTokenValid} = require("./jwt")
const checkPermission = require("./checkPermission")
const cloudinary = require("./cloudinary")

module.exports = {
    sendVerificationCode,
    sendResetPasswordEmail,
    sendNotificationEmail,
    sendContactUsEmail,
    sendSuccessfulOrdersEmail,
    sendTrackingNumberEmail,
    CreateToken,
    CreateHash,
    attachCookiesToResponse,
    isTokenValid,
    checkPermission,
    cloudinary
}