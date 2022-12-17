const  express = require("express")
const router = express.Router()
const {authenticationMiddleware, authorizePermission} = require("../middlewares/authentication")
const {getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct} = require("../controllers/productControllers")

router.route("/")
.get(getAllProducts)
.post(authenticationMiddleware, authorizePermission("admin"),  createProduct);
router.route("/:id")
.get(getSingleProduct)
.patch(authenticationMiddleware, authorizePermission("admin"),  updateProduct)
.delete(authenticationMiddleware, authorizePermission("admin"),  deleteProduct)

module.exports = router;