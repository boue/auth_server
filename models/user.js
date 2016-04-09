const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define User Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password, presave is before saving model run this fun()
userSchema.pre('save', function(next) {
  //getting access to user model (user instance of user model user.email/user.password)
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;
      //next is basically save the model
      next();
    });
  });
});

//whenever we create a new user it will have access to all these methods 
//user password is our hash and salted password
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

//Create the model class, add model as schema (all users)
const ModelClass = mongoose.model('user', userSchema);

//can't use export keyword yet no support
module.exports = ModelClass;