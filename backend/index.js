import express from "express";
import {connectDB} from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // allow us to parse incoming request: req.body
app.use(cookieParser()); // Allow us to parse insoming cookie

app.get("/",(req,res) => {
    res.send("Hello Auth !");
});

app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on PORT:", PORT);
});
