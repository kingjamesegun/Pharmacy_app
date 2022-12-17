const User = require("../models/user")
const utils  = require("../utils")



const AddUserImage = async(req, res, next) => {
    const {image} = req.files;
    const result = await utils.cloudinary.uploader.upload(image.path, {
        folder: "user",
        transformation:[{
            fetch_format: "png",
            height: 256,
            width: 256,
            crop: "fill"
        }],
    });
    const user = await User.findById(req.user.userId)
    user.picture.public_id = result.public_id;
    user.picture.url = result.secure_url;
    
    await user.save();
    res.status(200).json({msg: "success"})
}

const updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.user.userId, req.body, {new: true, runValidators: true});
    res.status(200).json({msg: "User details updated succesfully."})
}

const showCurrentUser = async(req, res) => {
    const user = await User.findById(req.user.userId)
    res.status(200).json({user: req.user, picture: user.picture.public_id})
}


const getAllUsers = async(req, res) => {
    const user = await User.find({role: "user"}).select("-password");
    res.status(200).json({users: user})
}

module.exports = {
    showCurrentUser,
    getAllUsers,
    updateUser,
    AddUserImage
}