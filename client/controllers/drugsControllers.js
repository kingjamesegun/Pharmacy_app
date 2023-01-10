const Drug = require("../models/drugs")
const CustomError = require("../errors");
const utils = require("../utils");


const createDrug = async(req, res, next) => {
    const {name, price, description, discount, category, delivery, quantity, tax} = req.fields;
    let images = [];
    if (req.files.image.length > 1){
        for(const image of req.files.image){
            const result = await utils.cloudinary.uploader.upload(image.path, {
                folder: "products",
                transformation:[{
                    fetch_format: "png",
                    height: 256,
                    width: 256,
                    crop: "fill"
                }],
            });
            const singleImage = { 
                        public_id: result.public_id,
                        url: result.secure_url
            };
            images = [...images, singleImage];
        };
    }else{
        const result = await utils.cloudinary.uploader.upload(req.files.image.path, {
            folder: "products",
            transformation:[{
                fetch_format: "png",
                height: 256,
                width: 256,
                crop: "fill"
            }],
        });
        const singleImage = { 
                    public_id: result.public_id,
                    url: result.secure_url
        };
        images = [...images, singleImage];
    };
     
    const Drug = await Drug.create({
        name, price, description, category, discount, delivery, quantity, tax,
        image: images,
        createdBy: req.user.userId,
    });
    res.status(201).json({Drug})
}


const getAllDrugs = async(req, res) => {
    const page = req.query.pageNumber || 1;
    const limit = req.query.pageLimit || 12;
    const {category} = req.query;

    const skip = (page - 1) * limit;
    const whole = Math.floor((await Drug.find({category})).length / limit);
    const pages = (((await Drug.find({category})).length % limit) === 0);
    const totalPages = pages ? whole: whole + 1;

    
    const drugs = await  Drug.find({category}).skip(skip).limit(limit);
    
    const range = {
        limit,
        totalPages, 
        count: drugs.length,
        skip,
        pageNumber: page
    }
    res.status(200).json({range, drugs, nbHits: drugs.length})
}

const getSingleDrug = async(req, res) => {
    const {id: drugId} = req.params;
    const Drug = await Drug.findOne({_id: drugId})
    if (!Drug){
        throw new CustomError.NotFoundError(`No Drug with id: ${drugId}`);
    }
    res.status(200).json({Drug});
}

const deleteDrug = async(req, res) => {
    const {id: drugId} = req.params;
    await Drug.findByIdAndDelete(drugId)
    res.status(200).json({msg: "Successful"})
}

const updateDrug = async(req, res) => {
    const {id: drugId} = req.params;
    const Drug = await Drug.findByIdAndUpdate(drugId, req.body, {new: true, runValidators: true});
    if(!Drug){
        throw new CustomError.NotFoundError(`No Drug with id: ${drugId}`);
    }
    res.status(200).json({Drug})
}

module.exports = {
    createDrug,
    getAllDrugs,
    getSingleDrug,
    updateDrug,
    deleteDrug,
}