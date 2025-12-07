const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/User");

//auth
exports.auth = async (req,res,next) => {
    
    const token = 
    req.cookies.token 
    // || req.body.token
    || req.header("Authorization")?.replace("Bearer ", "");

   
    
    try{
        if(!token){
        return res.status(401).json({
            success:false,
            message:"token missing",
        })};
        console.log(token)
        try{
            const verifytoken =  jwt.verify(token,process.env.JWT_SECRET);
            req.user = verifytoken;
            console.log("this is jwt verify response",verifytoken);
            next(); 
        }
        catch(error){
            return res.status(500).json({
                message:"cannot verify token******300000",
                success:false,
            });
        }   
    }
    catch(error){
        return res.status(500).json({
            message:error.message || "cannot verify token",
            success:false,

        })

    }
    
}



