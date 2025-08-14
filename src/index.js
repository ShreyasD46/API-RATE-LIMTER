import express from "express";
import dotenv from "dotenv"
import rateLimiter  from './rateLimiter.js'
dotenv.config();

const app = express();

app.use(rateLimiter);

app.get("/",(req,res)=>{
  try{
  res.status(200).json({message:"HELOO UR WITHIN THE RATE LIMIT"})
  }catch(err){
    console.log("couldnt send request")
  }
});


const PORT = process.env.PORT || 8000;
 app.listen(PORT,()=>{
  console.log(`SERVER CONNECTED TO PORT:${PORT}`)
 }
);
