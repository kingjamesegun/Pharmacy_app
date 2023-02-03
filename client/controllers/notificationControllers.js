const Order = require("../models/order")
const custom = require("../errors")
const Notification = require("../models/notifications")


const createTransNotification = async (req, res) => {
    const {title, description, amount, status, orderId, transactionId, currency} = req.body;
    let payload = {user: req.user.userId, email: req.user.email, title, description, currency, orderId, status, amount, transactionId}

    const notif = await Notification.create(payload)

    const order = await Order.findOne({_id: orderId, user: req.user.email})
    if (!order){
        throw new custom.NotFoundError("Invalid Order")
    }
    order.status = status;
    await order.save();

    res.status(201).json({notification: notif})
}

const createMessageNotification = async (req, res) => {
    const {title, description} = req.body;
    let payload = {user: req.user.userId, title, description}
    const notif = await Notification.create(payload)
    res.status(201).json({notification: notif})
}

const createBoolNotification = async (req, res) => {
    //No use for this endpoint now
    const {title, description, receiver, options} = req.body;
    let payload = {user: receiver, title, description, options, sentBy: req.user.userId}
    const notif = await Notification.create(payload)
    res.status(201).json({notification: notif})
}
// create an endpoint to store the Bool Notification answer for both the sender snd receiver

const getAllNotifications  = async (req, res) => {
    const notif = await Notification.find({user: req.user.userId});
    res.status(200).json({notificatons: notif})
}

const getSingleNotification = async (req, res) => {
    const {id: notificationId} = req.params;
    const notif = await Notification.findById(notificationId);
    if (!notif){
        throw new custom.NotFoundError(`No Notification with id: ${notificationId}`)
    }
    res.status(200).json({notificaton: notif})
}

const deleteNotification = async (req, res) => {
    const {id: notificationId} = req.params;
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({msg: "Success"})
}

module.exports = {
    createBoolNotification,
    createMessageNotification,
    createTransNotification,
    getAllNotifications,
    getSingleNotification,
    deleteNotification
}