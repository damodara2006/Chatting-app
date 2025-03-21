import cloudinary from "./cloudinary.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const profilepic = AsyncHandler(async(req,res)=>{
    const {file} = req.body;
    console.log(file)
    const image = await cloudinary.uploader.upload({file})
    console.log(image)
    res.send(image)
})
export default profilepic