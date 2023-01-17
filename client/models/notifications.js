const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String 
    },
    amount:{
        type: Number
    }, 
    currency:{
        type: String
    },
    email:{
        type: String
    },
    orderId:{
        type: mongoose.Types.ObjectId,
        ref: "Order"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Notification", NotificationSchema);