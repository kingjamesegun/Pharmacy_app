const Product = require("../models/product")
const CustomError = require("../errors");
const utils = require("../utils");


const createProduct = async(req, res, next) => {
    const {name, price, description, material, finishing, delivery, quantity, tax} = req.fields;
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
     
    const product = await Product.create({
        name, price, description, material, finishing, delivery, quantity, tax,
        image: images,
        createdBy: req.user.userId,
    });
    res.status(201).json({product})
}


const getAllProducts = async(req, res) => {
    const page = req.query.pageNumber || 1;
    const limit = req.query.pageLimit || 12;

    const skip = (page - 1) * limit;
    const whole = Math.floor((await Product.find({})).length / limit);
    const pages = (((await Product.find({})).length % limit) === 0);
    const totalPages = pages ? whole: whole + 1;

    
    const products = await  Product.find({}).skip(skip).limit(limit);
    
    const range = {
        limit,
        totalPages, 
        count: products.length,
        skip,
        pageNumber: page
    }
    res.status(200).json({range, products, nbHits: products.length})
}

const getSingleProduct = async(req, res) => {
    const {id: productId} = req.params;
    const product = await Product.findOne({_id: productId})
    if (!product){
        throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }
    res.status(200).json({product});
}

const deleteProduct = async(req, res) => {
    const {id: productId} = req.params;
    await Product.findByIdAndDelete(productId)
    res.status(200).json({msg: "Successful"})
}

const updateProduct = async(req, res) => {
    const {id: productId} = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body, {new: true, runValidators: true});
    if(!product){
        throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }
    res.status(200).json({product})
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,

    updateProduct,
    deleteProduct,
}