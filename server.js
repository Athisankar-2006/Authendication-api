
require("dotenv").config();
const express=require("express");
const connectDB=require("./config/db");


const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");

connectDB();


const app=express();
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

// app.get("/",(req,res)=>{
//     res.send("hellow this is for check");
//     console.log("enjoy every moment");
// })




const PORT=process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`server runnig on port ${PORT}`)
});