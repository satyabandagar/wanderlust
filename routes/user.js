const express = require("express");  
const router = express.Router();  
const User = require("../models/user.js");  
const passport = require("passport");  
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/user.js");

router.get("/signup",(userControllers.renderSingup) );  

router.post("/signup",(userControllers.Usersingup) );  

router.get("/login",(userControllers.userLogin));  

// Corrected line below  
router.post("/login", 
    saveRedirectUrl, 
    passport.authenticate("local", 
        { failureRedirect: "/login", 
            failureFlash: true }),  
    userControllers.userLoginFrom
);  

router.get("/logout",(userControllers.userLogOut));

module.exports = router;