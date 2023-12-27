
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    comment:{
        type:String,},
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type: Date,
    default: Date.now // Set the default value to the current date and time
    }


})
module.exports = new  mongoose.model("Review",reviewSchema);
