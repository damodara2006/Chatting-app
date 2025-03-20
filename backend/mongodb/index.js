import mongoose from "mongoose"
import dotenv, { configDotenv } from "dotenv"
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorApi from "../utils/ErrorApi.js";


dotenv.config({
    path:'.env'
})
const MONGODB = AsyncHandler(async(req,res)=>{
    const connect = await mongoose.connect(process.env.mongodbuser)
    console.log("Connected");
    
})

  


export default MONGODB
