const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const MONGO_URL = process.env.ATLAS_URL;
console.log("MONGO_URL:", MONGO_URL); // Debugging step
console.log(process.env); // This will print all environment variables


main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "66c48f91433e1f7c8f4c9483" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
