const express = require("express")
const router = express.Router()
const {authenticationMiddleware, authorizePermission} = require("../middlewares/authentication")
const {createBoolNotification, createMessageNotification, createTransNotification, getAllNotifications,
    getSingleNotification, deleteNotification} = require("../controllers/notificationControllers")

router.post("/messages", authenticationMiddleware, createMessageNotification)
router.post("/logic", authenticationMiddleware, createBoolNotification)
router.post("/transaction", authenticationMiddleware, createTransNotification)
router.get("/", authenticationMiddleware, getAllNotifications)
router.get("/:id", authenticationMiddleware, getSingleNotification)
router.delete("/:id", authenticationMiddleware, deleteNotification)


module.exports = router;