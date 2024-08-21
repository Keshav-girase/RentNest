const express = require("express");

// merge parameter to router path i.e not consider as string
const router = express.Router({mergeParams: true}); 

// Method-override middileware
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

const { reviewSchema } = require("../schema.js");
// Middleware
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

// Middleware to validate review data
const {validateReview} = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controller/reviews.js")

// REVIEW POST ROUTE
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewController.createReview));

// Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;