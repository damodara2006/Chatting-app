import cloudinary from "./cloudinary.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const profilepic = AsyncHandler(async(req,res)=>{
    const {file} = req.body;
    const image = await cloudinary.uploader.upload({file})
    res.send(image)
})
export default profilepic