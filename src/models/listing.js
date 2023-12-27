const mongoose = require("mongoose");
const Review = require("./reviwe");

const Schema = mongoose.Schema;

const listingSchema = new  Schema({
title:{
type:String
},
descripition:String,
image:{
type:String,
Set:(v)=>
v==="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=600"
?"":v,
default: "https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&w=600" ,

},
Price:Number,
Location:String,
countery:String,
reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Review",
    },
]


})
const Listing  = new mongoose.model("Listing",listingSchema);
module.exports=Listing;