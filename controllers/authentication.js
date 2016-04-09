const User = require('../models/user');

//put in some logic from post req signup route
exports.signup = function(req, res, next) { 
  //Pull data from request obj
  const email = req.body.email;
  const password = req.body.password;

  //See if user with given email exists to avoid dupes
  User.findOne({ email: email }, function(err, existingUser){
    
  });

  //If user with email does exist, return err

  //If user with email doesn't exist, create and save user reacord

  //Respond to request indicating the user was created
}