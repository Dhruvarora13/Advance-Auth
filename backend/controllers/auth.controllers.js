import bcryptjs from "bcryptjs"
import crypto from "crypto";
import dotenv from "dotenv";

import { generateVerificationToken} from "../utils/generateVerificationToken.js";
import {generateTokenAndSetCookies} from "../utils/generateTokenAndSetCookies.js";
import { sendVeriaficationEmail, sendWelcomeEmail, sendPasswordResetEmail,sendResetSuccessEmail } from "../mailtrap/emails.js";
import {User} from "../models/user.model.js";

dotenv.config();

export const signup = async (req,res) =>{
    const {email,password,name} = req.body;
    try {
        if(!email || !password || !name){
            throw new Error("All field are required");
        }
        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist){
            return res.status(400).json({success:false,message:"User Already exist"})
        }
        const hashedpassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationToken(); 

        const user = new User({
            email,
            password: hashedpassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000,
        })
        await user.save();

        generateTokenAndSetCookies(res,user._id);

        await sendVeriaficationEmail(user.email, verificationToken);
    
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        res.status(400).json({success:false,message: error.message})
    }
}

export const login = async (req,res) =>{
    const {email, password}= req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid Credentials"});
        }
        const  isPasswordValid = await bcryptjs.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false, messgae: "Incorrect password"});
        }

        generateTokenAndSetCookies(res,user._id);

        user.lastLogin = new Date ;
        await user.save();
        res.status(200).json({
            success: true,
            message:"Logged in successfully",
            user:{
                ...user._doc,
                password: undefined,
            },
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success:true, message:"Logged out Successfully"});
}

export const verifyEmail = async (req,res) =>{
    const {code} =req.body;
    try {
        const user =await User.findOne({
            verificationToken : code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if(!user){
            return res.status(400).json({success: false, message:"Invalud or expired Verification code"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email Verified Successfully",
            user:{
                ...user._doc,
                password: undefined,
            },
        })

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const forgetPassword =async (req,res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({success: false, messgae: "User not Exists"});
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now()+ 1*60*60*1000; // 1 hour
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    //semnd user reset password email
    await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({success: true, message:"Password reset LINK sent to your email"});

    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,message: error.message});
    }
}

export const resetPassword = async ( req, res) =>{
    try {
        const {token} =req.params;
        const {password} = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt : {$gt : Date.now() },
        })
        if(!user){
            return res.status(400).json({success:false,messgae:"Invalid or expired Token"});
        }

        const hashedPassword = await  bcryptjs.hash(password,10);
       
        user.password = hashedPassword;
        user.resetPasswordToken = undefined,
        user.resetPasswordExpiresAt = undefined,
        await user.save();

        sendResetSuccessEmail(user.email);

        res.status(200).json({success:true,message:"Congrates Passwrod reset successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message: error.message});
    }
}

export const checkAuth = async (req,res) => {
    try {
        const user = await User.findById(req.userID).select("-password");
        if(!user){
            return res.status(400).json({success:false,messgae: "user mnot found"});
        }
        res.status(200).json({success:true,user})
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message: error.message});
    }
}