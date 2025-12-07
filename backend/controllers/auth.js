const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//.......................signup contoller..........................
exports.signUp = async (req,res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = req.body;
        //checking cpass and pass same or not
        if(password!==confirmPassword){
            return res.status(400).json({
                message:"password and confirm password dont match",
                success:false,
            })
        }
        //checking user already exist or not
        const UserExist = await User.findOne({email});
        if(UserExist){
            return res.status(400).json({
                message:"User Already exist please login",
                success:false,
            })
        }
       
        //password hashing
        const HashedPassword = await bcrypt.hash(password,10);
        //upload userdata in DB
        const UserData = await User.create({
            firstName,
            lastName,
            email,
            password:HashedPassword,
            image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        return res.status(200).json({
            message:"user created successfully",
            success:true,
            UserData,
        })
       

    }
    catch(error){
        console.log("error occured in signup code--",error);
        return res.status(500).json({
                message:"User cannot be registered please try again",
                succes:false,
        })
    }
}



//.......................login controller.........................
exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        
        const LoginUserExist = await User.findOne({email})
        //check if user has signed up first
        if(!LoginUserExist){
            return res.status(401).json({
                message:"user dont exit please signup",
                success:false,
            })
        }
        //password match
        const passwordCheck = await bcrypt.compare(password,LoginUserExist.password);
        if(!passwordCheck){
            return res.status(400).json({
                message:"please enter correct password",
                success:false,
            })
        }
        const payload = {
            email:LoginUserExist.email,
            id:LoginUserExist._id,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"24h",
        });
        LoginUserExist.token = token;
        LoginUserExist.password = undefined;
        
        const options = {
            expires:new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token", token, options).status(200).json({
            message: "User logged in successfully",
            LoginUserExist,
            token,
            success: true,
        });

    }
    catch(error){
        console.log("something is wrong in login code--",error);
        return res.status(500).json({
            message:"error occured in login",
            success:false,
        })
    }

};




