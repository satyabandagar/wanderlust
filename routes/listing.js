const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema } = require("../schema.js");
const Listing = require("../models/listing"); 
const {isLoggedIn,isOwner} = require("../middleware.js");

const listingControler = require("../controllers/listings.js");
const multer = require('multer');  
const { storage } = require('../cloudConfig.js');  
const upload = multer({ storage });

const validateListing = (req, res , next )=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

// index rout 
router.get("/",(listingControler.index) );  

// new route
router.get("/new",isLoggedIn,(listingControler.renderNewForm));

// show route
router.get("/:id",( listingControler.showListing));

// Create route
router.post("/", isLoggedIn,upload.single("listing[image]"),(listingControler.createListing) );

// Edit route  
router.get("/:id/edit",isLoggedIn, isOwner, (listingControler.renderListing));

// Update route  
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),(listingControler.updateListing) );

// Delete Routr
router.delete("/:id",isLoggedIn,isOwner,(listingControler.daleteListing) );

module.exports = router;