const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");
const Sampledata = require("./data.js");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Treaval');
console.log("mongoose responsed sucessfully");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const initDb = async()=>{
  await Listing.deleteMany({});
    Sampledata.map(function sample(datta){
      return Listing.insertMany(datta)
 })
 
    console.log("data was intialized")
};
initDb();