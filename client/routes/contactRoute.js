const express = require("express");
const router = express.Router();
const ContactUs = require("../controllers/contactController");

router.post("/", ContactUs);

module.exports = router;