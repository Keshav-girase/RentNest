const Listing = require("./models/listing");
const {listingSchema } = require("./schema.js");
const Review = require("./models/review");
const { reviewSchema } = require("./schema.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        //redirect url save for redirecting user to same url trying to access after login
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Access denied! You must be logged in to list a new property.");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl =  (req, res, next) => { 
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(req.body);
    if (error) {
        let errMsg = error.details.map( (el) => el.message).join(" , ");
        // console.log(errMsg);
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
    // next();
};

module.exports.validateReview = (req, res, next) => {
    // console.log(req.body);
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        if (error) {
            let errMsg = error.details.map( (el) => el.message).join(" , ");
            throw new ExpressError(400, errMsg);
        } else {
            // console.log(req.body);
            next();
        }
    }
    // console.log(req.body);
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not a author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}