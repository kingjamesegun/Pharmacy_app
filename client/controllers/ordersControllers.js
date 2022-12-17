const Order = require("../models/order")
const Request = require("../models/request")
const Product = require("../models/product")
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
       const product = await Product.findOne({_id: item.product});
       if(!product){
            throw new CustomError.NotFoundError(`No product with id: ${item.product}`)
       }
       const request = await Request.findOne({_id: item.request});
             //check if there is a request or not in single order
            //if there is a request from the user
        if(request){
            //check whether product in request is equal to product cart item quantity also
            if (request.product.toString() !== item.product || request.quantity !== item.quantity){
                 throw new CustomError.BadRequestError(`The data in request and cart do not match for product: ${item.product}`);
            }
           //then add price to graphic desgn fee
            let amount = item.price + 5000;
            //get some items from the product  name, price, image, _id and store in single order schema
           const {name, tax: taxAmount, image, _id} = product;
           const singleOrderItem = {
                name,
                image,
                price: item.price,
                quantity: item.quantity,
                graphicDesign: 5000,
                amount,
                tax: taxAmount,
                product: _id,
                request: request._id
            }
            orderItems = [...orderItems, singleOrderItem];
            //increase subtotal
            subtotal += amount;
            //increase tax
            tax += taxAmount;
        }else{
        //if there is no request from the user
            let amount = item.price;
            const {name, tax:taxAmount, image, _id} = product;
            const singleOrderItem = {
                name,
                image,
                price: item.price,
                quantity: item.quantity,
                amount,
                customDesign: item.customDesign,
                tax: taxAmount,
                product: _id,
            }
            orderItems = [...orderItems, singleOrderItem];
            subtotal += amount;
            tax += taxAmount;
       }
    }
    const total = subtotal + tax + Number(shippingFee);;
    const trackNumber = "RC-" + crypto.randomBytes(12).toString("hex");
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
    .populate("orderItems.request");
    res.status(200).json({orders})
}
const getSingleOrder = async (req, res) => {
    const {id: orderId} = req.params;
    const order = await Order.findById({_id: orderId})
    .populate("orderItems.request");
    if (!order) {
        throw new CustomError.NotFoundError("Order does not exist")
    }
    //check permissions
    utils.checkPermission(req.user, order.user)
    res.status(200).json({order})
}

const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({user: req.user.userId})
    .populate("orderItems.request");
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