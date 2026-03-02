const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/user");


const router=express.Router();


//register

router.post("/register",async(req,res)=>{
    const{ name,email,password }=req.body;

    try{
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "user already exists"});
        }

        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

       
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({message : "user registed successfullly"});

    }catch(error){
        res.status(500).json({message:error.message})
    }
})




//login

router.post("/login",async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.send(400).json({message: "invalid credentials"});
        }


        const token=jwt.sigh(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIN :"1d"} 
        );

        res.json({token});

        
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


module.exports=router;