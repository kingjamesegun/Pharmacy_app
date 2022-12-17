const express = require("express")
const router = express.Router()
const {authenticationMiddleware, authorizePermission} = require("../middlewares/authentication")
const {createRequest, getAllRequests, customUpload} = require("../controllers/requestController")

router.route("/")
.get(authenticationMiddleware, authorizePermission("admin"), getAllRequests)
.post(authenticationMiddleware, createRequest);
router.post("/upload-design", authenticationMiddleware, customUpload);

module.exports = router;