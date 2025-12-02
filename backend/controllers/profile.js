import {cloudinary} from "./cloudinary.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { LoginSchema } from "../models/Login.js";

const profilepic = AsyncHandler(async(req,res)=>{
    const {file} = req.body;
    const image = await cloudinary.uploader.upload({file})
    res.send(image)
})

const userprofile = AsyncHandler(async(req,res)=>{
    const {array,username} = req.body;
    let userprofile = [];
   
        for (let item of array) {
            let pic = await LoginSchema.findOne({ username: item }).select("profile , -_id")

            userprofile.push(pic?.profile)
        }
        
        res.send(userprofile)
    
   
})
export  {profilepic, userprofile}