import { v2 as cloudinary } from "cloudinary";
import dotenv, { config } from "dotenv";
import AsyncHandler from "../utils/AsyncHandler.js";
import multer from "multer";
import fs from "fs"
dotenv.config({
  path: ".env"
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCloud = async (req,res , next) => {
    let filepath = req.file

    try {
        const response = await cloudinary.uploader.upload(filepath)
    let filelink = response.secure_url
    req.filelink = filelink
    fs.unlinkSync(filepath)
    
    
    } catch (error) {
        console.log("Error on uploading image")
    fs.unlinkSync(filepath)
    }
    next()
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const profilepic = AsyncHandler(async(req,res , next)=>{

    if(!req.files) return res.send("Choose profile")
    req.file = req.files[0].path

    next()
})

export  {cloudinary , upload , profilepic ,uploadOnCloud};




