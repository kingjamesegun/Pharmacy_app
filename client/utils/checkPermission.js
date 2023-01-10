const CustomError = require("../errors")

const checkPermission = (requestUser, userId) => {
    if(requestUser.role === "admin") return;
    if(requestUser.userId === userId.tostring()) return;
    throw new CustomError.UnAuthorizedError("You are not authorized to access this route");
}

module.exports = checkPermission;