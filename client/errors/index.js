const BadRequestError = require("./badRequest")
const NotFoundError =  require("./notFound")
const UnAuthenticatedError = require("./unAuthenticated")
const UnAuthorizedError = require("./unAuthorized")

module.exports = {
    BadRequestError,
    NotFoundError, 
    UnAuthenticatedError,
    UnAuthorizedError
}