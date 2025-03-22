import AsyncHandler from "../utils/AsyncHandler.js";
import { LoginSchema } from "../models/Login.js";
import jwt from  "jsonwebtoken"
const changedata = AsyncHandler(async(req,res)=>{
    let file = req.filelink
    let email = req.email
    await LoginSchema.findOneAndUpdate({email:email }).updateOne({profile:file})
    const user = await LoginSchema.findOne({email:email})
    const token = await jwt.sign( {user} , "json-web-token" );
          res.cookie("Logeduser", token, { maxAge: 1200000 , secure:false});
   return res.send(user)
})

export default changedata