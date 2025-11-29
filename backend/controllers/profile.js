import {cloudinary} from "./cloudinary.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { LoginSchema } from "../models/Login.js";
import { redis } from "../src/app.js";

const profilepic = AsyncHandler(async(req,res)=>{
    const {file} = req.body;
    const image = await cloudinary.uploader.upload({file})
    res.send(image)
})

const userprofile = AsyncHandler(async(req,res)=>{
    const {array,username} = req.body;
    let userprofile = [];
    const cache = await redis.get(`chat/${username}`)
    if (!cache) {
        for (let item of array) {
            let pic = await LoginSchema.findOne({ username: item }).select("profile , -_id")

            userprofile.push(pic?.profile)
        }
        await redis.setEx(`chat/${ username }`, 3600, JSON.stringify(userprofile))
        res.send(userprofile)
    }
    else {
        console.log(cache);
        
        res.send(JSON.parse(cache))
    }
   
})
export  {profilepic, userprofile}