
const mongoose = require("mongoose");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://roamrover:harshit9660@cluster0.sbirrhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
console.log("mongoose responsed sucessfully");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
/*'mongodb://127.0.0.1:27017/Roamrover' */

//mongodb://127.0.0.1:27017/Roamrover