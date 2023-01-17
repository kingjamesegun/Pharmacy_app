const express = require("express")
const router = express.Router()
const createPaymentIntent = require("../controllers/paymentController")
const {authenticationMiddleware} = require("../middlewares/authentication")

router.post("/", authenticationMiddleware, createPaymentIntent)

module.exports = router;