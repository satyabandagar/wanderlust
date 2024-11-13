const Listing = require("../models/listing");

module.exports.index = async (req, res) => {  
    try {  
        const allListings = await Listing.find({});  // Ensure you await the query  
        res.render("listings/index", { allListings });  // Use res.render to render EJS  
    } catch (error) {  
        console.error("Error fetching listings:", error);  
        res.status(500).send("Internal Server Error"); // Handle errors  
    }  
};

module.exports.renderNewForm = async(req,res)=>{
   
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {  
    const { id } = req.params;  
    const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner");  

    // Ensure the listing exists  
    if (!listing) {  
        return res.status(404).send("Listing not found");  
    }  
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {  
    try {  
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);  
        newListing.owner = req.user._id;
        newListing.image = {url, filename};  // Set the owner before saving  
        await newListing.save(); // Now save the listing with the owner assigned  
        req.flash("success", "New Listing Created!");  
        res.redirect("/listings");  
    } catch (err) {  
        // Handle the error, e.g., by rendering an error page or sending an error response  
        next(err); // Pass to the error handling middleware  
    }  
};

module.exports.renderListing = async (req, res) => {  
    let { id } = req.params;  
    try {  
        const listing = await Listing.findById(id);  
        if (!listing) {  
            return res.status(404).send("Listing not found.");  
        }  
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250");
        res.render("listings/edit.ejs", { listing, originalImageUrl });  
    } catch (err) {  
        console.error(err);  
        res.status(500).send("Server Error");  
    }
};

module.exports.updateListing = async (req, res) => {  
    let { id } = req.params;  
    
    try {  
      let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); 
      if( typeof req.file !== "undefined"){
        let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url, filename};
      await listing.save();
      }
      
        req.flash("success","listing updated successfully");  
        res.redirect(`/listings/${id}`);  
    } catch (err) {  
        console.error(err);  
        res.status(500).send("Server Error");  
    }  
};

module.exports.daleteListing = async(req, res)=>{
    let{id}=req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "listing deleted successfully");
    res.redirect("/listings");
};