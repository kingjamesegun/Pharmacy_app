const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "please provide product's name"],
        maxlength: [100, "Name cannot be more than 100 characters"]
    },
    price:{
        type: Number,
        required: [true, "please provide product's price"], 
        default: 0
    },
    description:{
        type: String,
        required: [true, "please provide product's description"],
        maxlength: [1000, "Description cannot be more than 1000 characters"]
    },
    image:[{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    }],  
    category:{
        required: true,
        type: String,
    },
    quantity:{
        required: true,
        type: Number,
    },
    material:{
        type: String,
        required: [true, "please provide product's material"],
    },
    finishing:{
        type: String,
        required: [true, "please provide product's finishing"],
    },
    delivery:{
        required: true,
        type: String,
    },
    tax:{
        type: Number,
        required: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", ProductSchema);