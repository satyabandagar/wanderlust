const express = require("express");
const app = express();

app.get("/",(req ,res)=>{
    res.send("Hi , I am root!");
});
// index raut
app.get("/user",(req, res)=>{
    res.send("user index updown");
});
//show rout
app.get("/user/:id",(req, res)=>{
    res.send("user show rout ");
});
//post 
app.post("/user",(req, res)=>{
    res.send("post for user");
});
// delete
app.delete("/user/:id",(req, res)=>{
    res.send("delete for user id");
})

// post 
// index raut
app.get("/posts",(req, res)=>{
    res.send("user index updown");
});
//show rout
app.get("/posts/:id",(req, res)=>{
    res.send("user show rout ");
});
//post 
app.post("/posts",(req, res)=>{
    res.send("post for user");
});
// delete
app.delete("/posts/:id",(req, res)=>{
    res.send("delete for user id");
})
app.listen(3000, ()=>{
    console.log("server is listening to 3000");
})