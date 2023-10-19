
// importing modules 
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 
  
  
var UserSchema = new Schema({  
    username: {type: String, required:true, maxLenght: 10},  
    email: {type: String, required:true, unique:true}, 
}); 
  
// plugin for passport-local-mongoose 
UserSchema.plugin(passportLocalMongoose); 
  
// export userschema 
 module.exports = mongoose.model("User", UserSchema); 