const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controller/users.js");

router.get("/signup", userController.signupForm);

router.post("/signup", userController.signup);

router.get("/login", userController.loginForm);

passportAuthenticate = passport.authenticate("local", {failureRedirect: '/login', failureFlash:true});

router.post("/login", saveRedirectUrl, passportAuthenticate,userController.login);

router.get("/logout", userController.logout);

module.exports = router;