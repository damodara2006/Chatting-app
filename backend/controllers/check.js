import AsyncHandler from "../utils/AsyncHandler.js";
import cookieParser from "cookie-parser";

const check = AsyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie.Logeduser){
       return res.status(400).json({message : "Please login"})
    }
    return res.send("Verified")
})

export default check;