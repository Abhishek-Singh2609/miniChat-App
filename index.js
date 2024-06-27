const express =require("express");
const app = express();
const mongoose =require("mongoose");
const path = require("path")
const chat =require("./models/chat.js")
const methodOverride =require("method-override");
const ExpressError = require("./ExpressError");
const { dir } = require("console");

app.set("views", path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().then((res)=>{
    console.log("connection successful");
}).catch((err) => {console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

//Index Route
app.get("/chats",async (req,res,next)=>{
     try {
        let chats = await chat.find()
    //  console.log(chats);
     res.render("index.ejs",{chats})
     } catch (err) {
        next(err)
     }
})
//New chat Route
app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404,"Page not found");
    res.render("new.ejs")
})
// create route
app.post("/chats", async (req,res, next)=>{
try{
    let {from,to,msg} = req.body;
 let newchat =new chat({
    from:from,
    to :to,
    msg:msg,
    created_at:new Date(),
    updated_at:new Date(),
 });
 await newchat.save()
 res.redirect("/chats")
} catch(err){

    next(err)
}
});

 function asyncWrap(fn){
    return function(req, res, next){
        fn(req,res,next).catch((err)=> next(err));
    };
 }
 
//NEW Show routes
app.get("/chats/:id",asyncWrap( async (req,res,next)=>{
    
    let { id } = req.params;
let chats = await chat.findById(id);
if(!chats){
    next(new ExpressError(404,"Chat not found"));
}
res.render("edit.ejs",{chats})

}));
//Edit routes
app.get("/chats/:id/edit", async (req,res,next)=>{
    try {
        let { id } = req.params;
    let chats = await chat.findById(id);
    res.render("edit.ejs",{chats})
    } catch (err) {
        next(err)
    }
});
//Update routes 
// app.put("/chats/:id",async (req,res)=>{
//     let {id}= req.params;
//     let {msg : newmsg, updated_at }=req.body;
//     console.log(newmsg);
//     let updatedchat = await chat.findByIdAndUpdate(id,{msg:newmsg,updated_at: new Date()},{runValidators:true,new:true});
//     console.log(updatedchat);
//     res.redirect("/chats");
// });
//Destroy Route
app.delete("/chats/:id", async(req,res,next)=>{
try {
    let {id}= req.params;
let deletedchat =await chat.findByIdAndDelete(id);
console.log(deletedchat);
res.redirect("/chats")
} catch (err) {
    next(err)
}
})

app.get("/",(req,res)=>{
    res.send("root is working")
});
const handleValidationErr=(err)=>{
    console.log("This was validation error.Please follow rules");
   console.dir(err.message);
   return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==="ValidationError"){
        err= handleValidationErr(err);
    }
    next(err)
})

// Error handling Middleware
app.use((err,req,res,next)=>{
    let {status=500,message="Some error Occured"} = err;
    res.status(status).send(message);
})

app.listen(8080,()=>{
    console.log("Server is listening on port 8080");
}
);

// Instead of using try and block we can use asyncWrap function to handle error use of try and catch is bulky 