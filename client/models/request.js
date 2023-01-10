const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    graphicDesignFee: {
        type: Number,
        required: true
    },
    requestBody: {
        type: String,
    },
    logo: {
          public_id:{
            type: String,
        },
        url:{
            type: String,
        }  
    },
    user:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Request", RequestSchema);