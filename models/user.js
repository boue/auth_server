const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define User Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//Create the model class, add model as schema (all users)
const ModelClass = mongoose.model('user', userSchema);

//can't use export keyword yet no support
module.exports = ModelClass;