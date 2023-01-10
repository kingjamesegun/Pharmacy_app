const express = require("express")
const router = express.Router()
const response = require("../controllers/paymentController")
const {authenticationMiddleware} = require("../middlewares/authentication")

router.get("/", authenticationMiddleware, response)

module.exports = router;