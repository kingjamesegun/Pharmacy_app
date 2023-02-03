const  express = require("express")
const router = express.Router()
const {authenticationMiddleware, authorizePermission} = require("../middlewares/authentication")
const {getAllDrugs, getSingleDrug, createDrug, updateDrug, deleteDrug} = require("../controllers/drugsControllers")

router.route("/")
.get(authenticationMiddleware, getAllDrugs)
.post(authenticationMiddleware, authorizePermission("admin"),  createDrug);
router.route("/:id")
.get(authenticationMiddleware, getSingleDrug)
.patch(authenticationMiddleware, authorizePermission("admin"),  updateDrug)
.delete(authenticationMiddleware, authorizePermission("admin"),  deleteDrug)

module.exports = router;