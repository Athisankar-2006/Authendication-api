const express =require("express");
const User=require("../models/user");
const protect=require("../middleware/authMiddleware");


const router=express.Router();

// get profile

router.get("/profile",protect,async(req,res)=>{
    const user =await User.findById(req,user).select("-password");
    res.json(user);

});

//update profile
router.put("/profile",protect,async(req,res)=>{
    const user=await User.findById(req.user);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;

        await user.save();
        res.json({ message: "profile updated"});
    }
});

module.exports=router;