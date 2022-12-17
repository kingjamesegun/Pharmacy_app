const mongoose = require("mongoose")

const ConnectDb = url => {
    mongoose.set('strictQuery', true);
    return mongoose.connect(url);
}

module.exports = ConnectDb;