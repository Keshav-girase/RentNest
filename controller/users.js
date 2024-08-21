const User = require("../models/user");

module.exports.signupForm = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username})
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.logIn(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Success! Your account has been created, and You are now logged in");
            res.redirect("/listings")
        })
        
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back! You’ve successfully logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You’ve successfully logged out. See you next time!");
        res.redirect("/listings");
    })
};