const {StatusCodes} = require("http-status-codes")

const errorhandler = (err, req, res, next) => {
    let customError = {
        status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Oops!, Something went wrong, try again later."
    }
    if(err.name === "CastError"){
        customError.status = 404;
        customError.message = `id: ${err.value} does not exist`;
    }
    if(err.code === 11000){
        customError.status = 400;
        customError.message =`${err.keyValue.phone} has already been used.`;
    }
    console.log(err)
    return res.status(customError.status).json({msg: customError.message});
}

module.exports = errorhandler;