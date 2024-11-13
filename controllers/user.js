const User = require("../models/user");
module.exports.renderSingup = (req, res) => {  
    res.render("users/signup.ejs");  
};
module.exports.Usersingup = async (req, res) => {  
    try {  
        let { username, email, password } = req.body;  
        const newUser = new User({ email, username });  
        const registerUser = await User.register(newUser, password);  
        console.log(registerUser);  
        req.logIn(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");  
            res.redirect("/listings");  
        })
         
    } catch (e) {  
        req.flash("error", e.message); // Changed to "error"  
        res.redirect("/signup");  
    }  
};

module.exports.userLogin =  (req, res) => {  
    res.render("users/login.ejs");  
};

module.exports.userLoginFrom =  (req, res) => {  
    req.flash("success", "Welcome back to Wanderlust!");  
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);  
}  ;

module.exports.userLogOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out! ");
         res.redirect("/listings");
    })
};