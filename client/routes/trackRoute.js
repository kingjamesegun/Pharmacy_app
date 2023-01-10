const express = require("express");
const router = express.Router();
const {trackOrder, updateTrackDetail, getAllTrackDetails, getSingleTrackDetail, DeleteTrackDetail} = require("../controllers/trackController");
const {authenticationMiddleware, authorizePermission} = require("../middlewares/authentication");

router.route("/")
.get(trackOrder);
router.route("/all")
.get(authenticationMiddleware, authorizePermission("admin"), getAllTrackDetails);
router.route("/:id")
.get(authenticationMiddleware, authorizePermission("admin"), getSingleTrackDetail)
.patch(authenticationMiddleware, authorizePermission("admin"), updateTrackDetail)
.delete(authenticationMiddleware, authorizePermission("admin"), DeleteTrackDetail);

module.exports = router;
