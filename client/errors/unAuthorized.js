const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customError")

class UnAuthorizedError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = UnAuthorizedError;