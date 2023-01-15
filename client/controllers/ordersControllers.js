const Order = require("../models/order")
const Drug = require("../models/drugs")
const Track = require("../models/track")
const CustomError = require("../errors")
const utils = require("../utils")
const crypto = require("crypto")

const createOrder = async (req, res) => {
    let {items: cartItems, shippingFee} = req.body
    //items is an array of single order
    if(!cartItems || cartItems.length < 1){
        throw new CustomError.BadRequestError("provide cart items")
    }
    if(!shippingFee){
        throw new CustomError.BadRequestError("Please provide shipping fee")
    }

    let orderItems = [];
    let subtotal = 0;
    let tax = 0;

    //loop through cartitems
    for(let item of cartItems){
        const drug = await Drug.findOne({_id: item.drug});
        if(!drug){
            throw new CustomError.NotFoundError(`No drugs with id: ${item.drug}`)
        }
        let disPrice = item.amount - ((item.discount/100) * item.amount)
        const {name, tax: taxAmount, image, _id} = drug;
        const singleOrderItem = {
            name,
            image,
            price: item.price,
            quantity: item.quantity,
            amount: disPrice,
            discount: item.discount,
            tax: taxAmount,
            drug: _id,
        }
        orderItems = [...orderItems, singleOrderItem];
        subtotal += disPrice;
        tax += taxAmount;
    }
    const total = subtotal + tax + Number(shippingFee);;
    const trackNumber = "PH-" + crypto.randomBytes(12).toString("hex");
    const order = await Order.create({
        shippingFee,
        tax,
        subtotal,
        total,
        orderItems,
        status: "pending",
        user: req.user.email
    });
    //send email to user about the tracking Number
    const track = await Track.create({user: req.user.email, order: order._id, status: "Order Recieved, Check back later", trackNumber});
    await utils.sendTrackingNumberEmail({email: req.user.email, trackingNo: track.trackNumber, username: req.user.username})
    //update order with track Id
    order.trackId = track._id;
    await order.save();

    res.status(201).json({order})
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({})
    res.status(200).json({orders})
}
const getSingleOrder = async (req, res) => {
    const {id: orderId} = req.params;
    const order = await Order.findById({_id: orderId})
    if (!order) {
        throw new CustomError.NotFoundError("Order does not exist")
    }
    //check permissions
    utils.checkPermission(req.user, order.user)
    res.status(200).json({order})
}

const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({user: req.user.email});
    if(!orders){
        throw new CustomError.NotFoundError("No orders have been created by this user")
    }
    res.status(200).json({orders})
}

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders
}