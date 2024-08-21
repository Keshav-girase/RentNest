const { ref } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
const { anySeries } = require("async");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{ 
        type: String,
    },
    description: String,
    image: { 
        filename: {
            type: String
        },
        url: {
            type: String,
        }
        
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});


listingSchema.post("findOneAndDelete", async (Listing) =>{
    if (Listing) {
        await Review.deleteMany({ _id: { $in: Listing.reviews} })
    }
});
 
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;