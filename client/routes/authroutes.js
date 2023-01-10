const express = require("express")
const router = express.Router()
const {Register, Login, Logout, VerifyToken, ResetPassword, ForgotPassword, ResendCode } = require("../controllers/authControllers")
const {authenticationMiddleware} = require("../middlewares/authentication")

router.post("/sign-up", Register)
router.post("/login", Login)
router.get("/logout", authenticationMiddleware, Logout)
router.get("/resend-code", authenticationMiddleware, ResendCode)

router.post("/verify-code", authenticationMiddleware, VerifyToken)
router.post("/forgot-password", ForgotPassword)
router.post("/reset-password", authenticationMiddleware, ResetPassword);

module.exports = router;