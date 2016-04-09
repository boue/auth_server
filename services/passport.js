//passport helps us authenticate user when they try to visit route that requires auth
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy; //extracting prop Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt; //''ExtractJwt

//strategy is a method for authenticating a user the one we have is to Verify user
//with JWT but there's many other available 

//configure JWT Strategy
const jwtOptions = {
  //look at header to find token
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //if we find user id from payload then we will pass it in the done callback 
  //otherwise we just calld one without a user object
  //token contains encoded data in authentication controller when encoded JWT
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); } //false bc we didnt find a user

    if (user) {
      done(null, user); //null bc no err, find user
    } else {
      done(null, false); //didn't find user
    }
  });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
