
require("dotenv").config();
const express=require("express");
const connectDB=require("./config/db");
// const mongoose=require("mongoose");

// mongoose.connect(process.env.MONGO_URL);

connectDB();


const app=express();

app.get("/",(req,res)=>{
    res.send("hellow this is for check");
    console.log("enjoy every moment");
})




const PORT=process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`server runnig on port ${PORT}`)
});