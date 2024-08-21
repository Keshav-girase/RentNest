if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override"); 
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require('connect-mongo'); // imp
const flash = require("connect-flash");
// Import middleware
const wrapAsync = require("./utils/wrapAsync.js");
// Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); 
//router
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

const dburl = process.env.ATLAS_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch( (err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(dburl);
}

// middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.urlencoded({extended: true})); // to parse the incoming data from server 
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public"))); 
app.engine('ejs', ejsMate);

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", () => {
    console.log("Error in Mongo session store");
})

sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());  // Initializes Passport or every request, Passport can process any authentication-related data (like credentials) and provide helper methods
app.use(passport.session());     // Integrates Passport with session management

// sets up Passport to use the LocalStrategy for authenticating users with a username and password.
passport.use(new LocalStrategy(User.authenticate())); // authenticate is a method provided by passport-local-mongoose , checking a user’s credentials,

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); // means store ralated info in session like credentials
passport.deserializeUser(User.deserializeUser()); // means remove ralated info from session like credentials

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(req.user);
    
    next();
});

app.get("/demouser", async (req, res) => {
    let fakeUser = new User ({
        email: "fake@gmail.com",
        username: "fakeuser"
    });

    let registeredUser = await User.register(fakeUser, "fake@123432");
    res.send(registeredUser);
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// // ROOT Route
// app.get("/" , (req, res) => {
//     res.send("Hii, This is root called");
// });



// SAMPLE DATA INSERTATION FOR TESTING DATABASE CONECTION
app.get("/testListing", wrapAsync (async (req, res) => {
    let sampleListing = new Listing ({
        title: "Cozy Villa",
        description: "by the beach",
        price: 1200,
        location: "Pune",
        country: "India",
    });

    await sampleListing.save();
    router.log("sample was saved");
    res.send("successful testing");
}));

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

app.use( (err, req, res, next) => {
    let {statusCode = 500, message = "Page Not Found"} = err;
    // res.status(statusCode).send(message);
    res.render("listings/error.ejs", {err})
});

app.listen(8080, () => {
    console.log("Server is listing to port 8080");
});