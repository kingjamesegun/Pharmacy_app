const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'leksyking', 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true, 
});

module.exports = cloudinary;