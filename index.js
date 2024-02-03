const express= require("express");
const app= express();
const mongoose = require('mongoose');
const path =require("path");
const Chat =require("./models/chat.js");
const methodOverride= require("method-override");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname ,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

main()
.then(() => {console.log('Connected!')})
 .catch((err)=>{console.log(err)});
 async function main(){
 await mongoose.connect('mongodb://127.0.0.1:27017/chatingapp');
};
// let chat1= new Chat({
//     from:"zaid",
//     to: "danish",
//     msg: "will you come tommorrow",
//     created_at: new Date()
// });
// chat1.save().then((res) =>{
//     console.log(res);
// });
// index route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs", {chats});
});
//create route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
});
//Edit route
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat= new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    });
newChat.save()
.then(res=>{console.log("chat was saved");
})
.catch((err)=>{console.log(err)})
res.redirect("/chats");
});
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}= req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
// Update Route
app.put("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let {msg: newMsg}= req.body;
    // console.log(msg);
    let updatedChat= await Chat.findByIdAndUpdate(id , {msg :newMsg},{runValidators:true,new:true});
    // console.log(updatedChat);
    res.redirect("/chats");
});
//Destroy Route
app.delete("/chats/:id",async(req,res)=>{
    let{id}=req.params;
  let DeletedChat=  await Chat.findByIdAndDelete(id);
  console.log(DeletedChat);
  res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("server is working")

})
app.listen(8080,(req,res)=>{
    console.log("port is listning");
});