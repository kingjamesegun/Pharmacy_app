const express = require("express");
const router = express.Router();
const {authenticationMiddleware, authorizePermission} = require("../middlewares/authentication")
const {createOrder, getAllOrders, getSingleOrder, getCurrentUserOrders} = require("../controllers/ordersControllers");

router.get("/showAllMyOrders", authenticationMiddleware, getCurrentUserOrders);
router.route("/")
.get(authenticationMiddleware, authorizePermission("admin"), getAllOrders)
.post(authenticationMiddleware, createOrder);
router.route("/:id")
.get(authenticationMiddleware, getSingleOrder);


module.exports = router;