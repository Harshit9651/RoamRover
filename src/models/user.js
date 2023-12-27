
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const localMnogoosepassport = require("passport-local-mongoose");
const userschema =  new Schema({
  Fname:String,
  Lname:String,
    username: String,
  Email:String,
  Number:Number,
  Password:String,



 

});

//userschema.plugin(localMnogoosepassport);
module.exports= new mongoose.model("User",userschema)