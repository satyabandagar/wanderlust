const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema} = require("../schema.js");
const Review = require("../models/review");
const Listing = require("../models/listing"); 
const reviewControllers = require("../controllers/reviews.js");
const validateReview = (req, res , next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, errMsg);
    }else{
        next(); 
    }
}

// Reviews
// PoSt Routr
// Reviews  
// Post Route  
 
router.post("/",(reviewControllers.createReview));
    
// Delete Review Route
router.delete("/:reviewId",(reviewControllers.deleteReview));

module.exports = router;