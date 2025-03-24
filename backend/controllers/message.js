import { messageSchema } from "../models/message.js";
import AsyncHandler from "../utils/AsyncHandler.js";


const message = AsyncHandler(async(req,res)=>{
    const {senderid, recevierid , text} = req.body;
    console.log(recevierid)

    
    const newMessage = new messageSchema({
        senderid:senderid,
        receiverid:recevierid,
        message:text
    })
    await newMessage.save()
   res.send(newMessage)
})

export {message}