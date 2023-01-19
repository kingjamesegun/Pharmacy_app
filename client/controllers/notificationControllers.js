const Order = require("../models/order")
const User = require("../models/user")
const custom = require("../errors")
const Notification = require("../models/notifications")


const createTransNotification = async (req, res) => {

}

const createOtherNotification = async (req, res) => {
    
}

const createBoolNotification = async (req, res) => {
    
}

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
    createOtherNotification,
    createTransNotification,
    getAllNotifications,
    getSingleNotification,
    deleteNotification
}