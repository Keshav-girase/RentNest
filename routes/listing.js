const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const {listingSchema } = require("../schema.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { redirect } = require("statuses");

// Middleware to validate data
const {isLoggedIn} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");

// Controller 
const listingsController = require("../controller/listings.js")

// Multer middlewere for halding file data
const multer  = require('multer');

//cloud storage
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// Index Route
router.get("/", wrapAsync (listingsController.index));

//to new listing route
router.get("/new", isLoggedIn, listingsController.newListingForm);

// Show Route
router.get("/:id", wrapAsync (listingsController.showListings));

//create route
//  validateListing,
router.post("/", isLoggedIn, upload.single('listing[image]'), wrapAsync (listingsController.createListing));

//EDIT ROOUTE
router.get("/:id/edit", wrapAsync (listingsController.editListing));

//UPDATE ROUTE
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync (listingsController.updateListing));

//DELETE ROUTE
router.post("/:id/delete", isOwner, wrapAsync ());

module.exports = router;