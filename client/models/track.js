const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
    trackNumber: String,
    status: String,
    user: {
        type: String,
        required: true
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: "Order",
        required: true
    }
});

module.exports = mongoose.model("Track", TrackSchema);