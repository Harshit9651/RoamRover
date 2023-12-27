

const dataaa = process.env.Map_token;

const express = require("express");
const app = express();
const path = require("path");



//** papport seseeeion session  */
const session = require("express-session");//for session means recall krna ki ha isko kitni der dikhana hai 
const Flash = require('connect-flash');//For flassinf 
const passport = require("passport")
const localstartys = require("passport-local")
const User= require("./models/user.js");
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  }));



app.use(Flash())
app.use(passport.initialize());// har reqct ke liye bnega nya paasport
app.use(passport.session()) // ek page se dusre page par agr same insan ja rha hai to session bna rhe kyonki ek session me ek bar hi login kare
//passport.use(new localstartys(User.authenticate()))// User model me hmne sirf email k liye likha h baki sb ye hi smbhala hai 
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

const bcrypt = require("bcryptjs");



//**// */



const nodemailer = require('nodemailer');
app. use(express.json());// for parsing 
app.use(express.urlencoded({extended:true}))//data by id aa jaye 
app.set("view engine","ejs");
const static_path = path.join(__dirname,"../views");//pura path dena hota hai 
app.use(express.static(static_path));
const methodoverride = require("method-override"); // for put patch and delete method
app.use(methodoverride("_method"));
const ejsmate = require("ejs-mate");
app.engine("ejs",ejsmate)
app.use(express.static(path.join(__dirname,"../public")));



const bodyParser = require('body-parser');

//const bcrypt = require('bcrypt'); 

require("./db/coonect")
const Listing = require("./models/listing.js");
const Review = require("./models/reviwe.js");
const { error } = require("console");
const port = 3000;
const cookieparaser = require("cookie-parser"); //for cookie
const { AsyncLocalStorage } = require("async_hooks");
const { register } = require("module");
//passport.use(new localstartys(User.authenticate()));

app.use(cookieparaser());

// for cookie
app.get("/sendcoookie",(req,res)=>{
    res.cookie("greet","hello bhn ke lund");
  res.cookie("greet","dnd")


    res.send("hello cookie");
 console.log("hello")
})

//flash massege



//++..``

app.get("/",(req,res)=>{
    res.send("hello")
  
})
app.listen(port,()=>{
    console.log("server run succesfully")
})


// Middleware to check if the user is logged in
/*const requireLogin = (req, res, next) => {
    if (!req.session.User) {
      return res.redirect("listings/loginnn.ejs");
    }
    next();
  };*/

 

app.get("/l", async(req,res,next)=>{
    const data = await Listing.find({});
    res.render("listings/index.ejs",{data});
  
  /*  try{
        
        const data = await Listing.find({});
        res.render("listings/index.ejs",{data});
    }
    catch(err){
      next(err);

    }*/
})


// demo user data 

//main demo 
app.get("/demouser",async(req,res)=>{
    res.render("listings/newlogin.ejs")
})

app.post("/demodata",async(req,res)=>{
   let {Email,Username,password,Fname,Lname,Number} = req.body;
   console.log(password)
   const passwordhash= await bcrypt.hash(password,10);
   console.log(passwordhash);

 
   const userd = new User({
    Emial:Email,
    username:Username,
    Number:Number,
    Fname:Fname,
    Lname:Lname,
    Password:passwordhash,
   })

  //const newuser=  await  User. register(userd,password);

 //console.log(newuser);
  // newuser.save();
  console.log(userd);


 const daata  = await userd.save();
 console.log(daata);
 
res.redirect("/l")
})



app.get("/login",(req,res)=>{
    res.render("listings/loginnn.ejs")
})


app.post('/logcheack', async(req, res) => {
   
  
    const {password,Username,Number} = req.body;
    console.log(password);
 
   
      // Find the user by email
      const user = await User.findOne({username:Username }).select("+password")

  
      if(user==null){
        res.render("listings/newlogin.ejs")
      }else{
        console.log(user)
        // User found, compare the provided password with the hashed password in the database



     try{  if(user.username===Username && user.Number==Number){ res.redirect("/l") }
       else{
        res.render("listings/loginnn.ejs");

    }  }
    catch(err){
        res.render("listings/loginnn.ejs");

    }

      }
     
 
  });
 


 

app.get("/newrout",(req,res)=>{
    res.render("listings/newlisting.ejs")
   
})



app.post("/newdata", async(req,res,next)=>{
   try{
    const{title,descripition,Image,Price,Location,Countery} = await  req.body;
    const newlisting = new Listing({
        title:title,
        descripition:descripition,
        image:Image,
        Price:Price,
        Location:Location,
        countery:Countery
    })
   
    if(!newlisting.title){
        const error = new Error('Request body is missing');
    error.status = 400; // Bad Request
    return next(error)
    }

    if(!newlisting.descripition){
        const error = new Error('Request body is missing');
    error.status = 400; // Bad Request
    return next(error)
    }
    if(!newlisting.image){
        const error = new Error('Request body is missing');
    error.status = 400; // Bad Request
    return next(error)
    }
    if(!newlisting.Price){
        const error = new Error('Request body is missing');
    error.status = 400; // Bad Request
    return next(error)
    }   if(!newlisting.Location){
        const error = new Error('Request body is missing');
    error.status = 400; // Bad Request
    return next(error)
    }
    if(!newlisting.countery){
        const error = new Error('Request body is missing');
    error.status = 400; // Bad Request
    return next(error)
    } 
   
    const data = await  newlisting.save();

    console.log(data);


    res.redirect("/l")


    console.log("hello")
   }catch(err){
console.log(err);// yani jese hi input me kuch galt hoga to error dega 

   }
})

app.get("/page1",(req,res)=>{
    res.render("listings/mapbox.ejs")
})


//search listing 
app.get("/listing/:_id",async(req,res)=>{
    try {
        let _id = req.params;
        
        const finddata = await Listing.findById(_id).populate("reviews");
        console.log(finddata);
        res.render("listings/show.ejs", { finddata });
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


// post yani create new data // 
app.post("/listings/:id/reviwes", async(req,res)=>{
    let{id} = req.params;

 let listing = await Listing.findById(id);
 let revdata = req.body.review;
 if(!req.body.review.rating){
    const error = new Error('Request body is missing');
error.status = 400; // Bad Request
return next(error)
}
if(!req.body.review.comment){
    const error = new Error('Request body is missing');
error.status = 400; // Bad Request
return next(error)
}
 let newreview = await new Review(revdata);

 listing.reviews.push(newreview);

 await listing.save();
await newreview.save();
console.log(revdata)
res.redirect(`/listing/${id}`)


    
})


app.delete("/listingdelete/:id",async(req,res)=>{
    let{id} =   req.params;


    console.log(id);
    const deletdata =  await Listing.findByIdAndDelete(id)
    console.log(deletdata);
    
    res.redirect("/l")
})

app.delete("/listing/:id/reviewedit",async(req,res)=>{

    let{id}=req.params;
    console.log(id);

    let datass =  await Review.findByIdAndDelete(id);
    console.log(datass);
    
    
    console.log("deleted success fully ")
    res.redirect("/l")
  
})


    //edit route
    app.get("/listings/:id/edit",async(req,res)=>{
        let{id}= await req.params;
        console.log(id);
    
    let findid =  await Listing.findById(id)
        res.render("listings/edit.ejs",{findid})
    })

    app.put("/listingsdata/:id",async(req,res)=>{
     try{
        const {id} = req.params
if(!req.body.listing.title){
    res.render("listings/error.ejs")
}
if(!req.body.listing.descripition){
    res.render("listings/error.ejs")
}if(!req.body.listing.image){
    res.render("listings/error.ejs")
}if(!req.body.listing.Price){
    res.render("listings/error.ejs")
}if(!req.body.listing.Location){
    res.render("listings/error.ejs")
}
if(!req.body.listing.Countery){
    res.render("listings/error.ejs")// yha apni glti  thi to dhyan se 
}

        await Listing.findByIdAndUpdate(id,{...req.body.listing})
res.redirect("/l");
   
     }
     catch(err){
        console.log(err);

     }
    })

  
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
      });
      
      // Error handling middleware
      app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render("listings/error.ejs", {err})
      });

  


   





