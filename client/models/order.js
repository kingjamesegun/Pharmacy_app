const mongoose = require("mongoose");

const SingleOrderItemSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    image: [{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    }],
    price: { 
        type: Number, required: true 
    },
    quantity:{
        type: Number, required: true
    },
    tax:{
        type: Number, required: true
    },
    discount: {
        type: Number, required: true
    },
    amount:{
        type: Number, required: true 
    },
    drug: {
        type: mongoose.Schema.ObjectId,
        ref: 'Drug',
        required: true
   }
});

const OrdersSchema = new mongoose.Schema({
    tax: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderItems: [SingleOrderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'cancelled', 'success'],
        default: 'pending'
    },
    user: {
        type: String,
        required: true
    },
    currency:{
        type: String,
        default: "USD"
    },
    trackId: String,
    },  
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", OrdersSchema)