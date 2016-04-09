const User = require('../models/user');

//put in some logic from post req signup route
exports.signup = function(req, res, next) { 
  //Pull data from request obj
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'you must provide email AND password '});
  }

  //See if user with given email exists to avoid dupes
  User.findOne({ email: email }, function(err, existingUser){
    if (err) { return next(err); }

    //If user with email does exist, return err
    if (existingUser){
      //.status sets http code on response
      return res.status(422).send({ error: 'Email is in use'});
    }

    //If user with email doesn't exist, create and save user reacord
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) { return next(err); }

    //Respond to request indicating the user was created  
    res.json({success: true});
    });
  });
}