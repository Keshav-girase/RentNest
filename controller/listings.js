const { model } = require("mongoose");
const Listing = require("../models/listing.js");

// Index route callback
module.exports.index = async (req, res) => {
    // console.log(req);
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", {allListings});
};

// Create new listing callback i.e form
module.exports.newListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Show all listing callback
module.exports.showListings = async (req, res) => {
    let {id}  = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{ path: "author" },}).populate("owner");
    // console.log(listing);
    if(!listing) {
        req.flash("error", "Listing Not Found Successfully");
        res.redirect("/listings");
        return;
    }
    res.render("listings/show.ejs", {listing});
};

// Post route callback for creating new listing
module.exports.createListing = async (req, res) => {
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if (result.error) {
    //     throw new ExpressError(400, result.error.message)
    // }
    let url= req.file.path;
    let filename= req.file.filename;
    // console.log(req);

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {filename, url}
    await newListing.save();
    req.flash("success", "New Listing Created Successfully");
    res.redirect("/listings")
    return; //optional
};

// Edit listing route's callback
module.exports.editListing = async (req, res) => {
    let { id }  = req .params;
    const listing = await Listing.findById(id)
    if(!listing) {
        req.flash("error", "Listing you requested, does not exist");
        req.redirect("/listings");
    }
    let originalImgURL= listing.image.url;
    originalImgURL = originalImgURL.replace('/upload', '/upload/,w_250/');
    res.render("listings/edit.ejs", { listing, originalImgURL });
};

// Update listing callback - post
module.exports.updateListing = async (req, res) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "send valid data for listing"); // for validation when the request send with empty data in database
    // }
    let { id }  = req .params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(typeof req.file !== "undefined") {
        let url= req.file.path;
        let filename= req.file.filename;
        listing.image = {filename, url}
        await listing.save();
    }
    req.flash("success", "Listing Updated Successfully")
    res.redirect("/listings");
};

// Delete listing callback
module.exports.destroyListing = async (req, res) => {
    let { id }  = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing Delete Successfully")
    res.redirect("/listings");
};