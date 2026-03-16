import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token || typeof token !== "string"){
         return res.status(400).json({success: false, messgae:"unauthorise - No token provided"});   
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({success:false, message:"unauthorise - Invaliud Token"});

        req.userID = decoded.userID;
        next();
    } catch (error) {
        console.log(error); 
        return res.status(500).json({success: false,message: error.message});
    }
}