const cloudinary = require('cloudinary').v2;  
const { CloudinaryStorage } = require('multer-storage-cloudinary');  

// Configure Cloudinary  
cloudinary.config({  
    cloud_name: process.env.CLOUD_NAME,  
    api_key: process.env.CLOUD_API_KEY,  
    api_secret: process.env.CLOUD_API_SECRET // Make sure this environment variable name is correct  
});  

// Set up Cloudinary storage for multer  
const storage = new CloudinaryStorage({  
    cloudinary: cloudinary,  
    params: {  
        folder: "wanderlust_DEV",  
        allowedFormats: ["png", "jpg", "jpeg"], // supports promises as well  
    },  
});  

module.exports = {  
    cloudinary,  
    storage,  
};