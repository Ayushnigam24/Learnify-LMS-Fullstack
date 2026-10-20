import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import router from "./routes/user.js"
import { dbConnect } from './database/db.js';
import courseRouter from './routes/courses.js';
import adminRouter from './routes/admin.js';
import Razorpay from 'razorpay';
import cors from 'cors'
import path from 'path'
import dns from 'dns'
import quizRouter from "./routes/quizRoutes.js";
import groqRouter from "./routes/groq.js";
dns.setServers(["1.1.1.1","8.8.8.8"]);
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
const app=express();
const PORT=5000; 
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.get("/",(req,res)=>{
  res.send("Server is working")
})


app.use('/api/user',router);
app.use('/api',courseRouter);
app.use('/admin',adminRouter);
app.use('/api/quiz',quizRouter);
app.use('/api/groq',groqRouter);

dbConnect();
app.listen(PORT,()=>{
    console.log("Server running..."); 
})