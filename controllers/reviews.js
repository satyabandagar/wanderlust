const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview =  async (req, res) => {  
    const { id } = req.params;  
    const listing = await Listing.findById(id);  

    // Ensure the listing exists  
    if (!listing) {  
        return res.status(404).send("Listing not found");  
    }  
    
    const newReview = new Review(req.body.review);  
    await newReview.save(); // Save the review first to get the ID  

    listing.reviews.push(newReview);  
    await listing.save();  
};

module.exports.deleteReview =  async (req, res) => {
    const { id, reviewId } = req.params;

    try {
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","review deleted successfullyu");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).send("Internal Server Error");
    }
};