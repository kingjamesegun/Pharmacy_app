const Request = require("../models/request");
const utils = require("../utils")

const createRequest = async (req, res) => {
    const {product, quantity, price, requestBody, graphicDesignFee} = req.fields;
    if(req.files.logo){
        const logoPath = req.files.logo.path;
        const result = await utils.cloudinary.uploader.upload(logoPath, {
            folder: "requests",
            transformation:[{
                fetch_format: "png",
            }],
        })
        const request = await Request.create({
            product, quantity, price, requestBody, graphicDesignFee,
            logo: { 
                public_id: result.public_id,
                url: result.secure_url
            },
            user: req.user.email,
        });
        res.status(201).json({request})
        return;
    }
  
    const request = await Request.create({
        product, quantity, price, requestBody, graphicDesignFee, user: req.user.email
    });
    res.status(201).json({request})
}

const getAllRequests = async (req, res) => {
    const requests = await Request.find({});
    res.status(200).json({requests});
}

const customUpload = async (req, res) => {
    const designFilePath = req.files.designFile.path;
    const result = await utils.cloudinary.uploader.upload(designFilePath, {
        folder: "custom",
        transformation:[{
            fetch_format: "png",
        }],
    });
    res.status(200).json({design: result.secure_url});
}

module.exports = {
    createRequest,
    getAllRequests,
    customUpload
};