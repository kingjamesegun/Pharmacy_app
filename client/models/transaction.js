const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    ref:{
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
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

module.exports = mongoose.model("Transaction", TransactionSchema)
