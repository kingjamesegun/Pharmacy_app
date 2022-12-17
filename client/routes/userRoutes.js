const  express = require("express")
const router = express.Router()
const {authenticationMiddleware, authorizePermission} = require("../middlewares/authentication")
const {showCurrentUser, getAllUsers, updateUser, AddUserImage} = require("../controllers/userController")

router.get("/showMe", authenticationMiddleware, showCurrentUser)
router.patch("/updateMe", authenticationMiddleware, updateUser)
router.get("/", authenticationMiddleware, authorizePermission("admin"), getAllUsers)
router.post("/add-image", authenticationMiddleware, AddUserImage)

module.exports = router;