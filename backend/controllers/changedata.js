import AsyncHandler from "../utils/AsyncHandler.js";
import { LoginSchema } from "../models/Login.js";

const changedata = AsyncHandler(async(req,res)=>{
    let file = req.filelink
    let email = req.email
    await LoginSchema.findOneAndUpdate({email:email }).updateOne({profile:file})
    const user = await LoginSchema.findOne({email:email})
    res.send(user)
})

export default changedata