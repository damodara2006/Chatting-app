import { LoginSchema } from "../models/Login.js";
import { messageSchema } from "../models/message.js";
import AsyncHandler from "../utils/AsyncHandler.js";
// import { redis } from "../src/app.js";
const messages = AsyncHandler(async (req, res) => {
    const { senderid } = req.body;
    const messages = await messageSchema.find({
        $or: [{ senderid: senderid }, { receiverid: senderid }]
    });

    const users = messages.map((item) => item.receiverid);
    const user1 = messages.map((item) => item.senderid);
    let alluser = [...new Set([...users, ...user1])]; // Combine and remove duplicates

  
    res.send(alluser);
});


const user = AsyncHandler(async(req,res)=>{
    const {array, username} = req.body
    let user = []

   
        
        for(let item of array){
         let value = await LoginSchema.findById(item)
         
         user.push([value?.username , value?._id])
        }
       
        console.log("DB HIT");
        
        res.send(user)
   
    
})



const usermsg = AsyncHandler(async(req,res)=>{
    const {id ,recevierid} = req.params;
    // console.log(userid)
    const user = await messageSchema.find({
        $or:
           [
            {
                $and:[{senderid:id},{receiverid:recevierid}]
            },
            {
                $and:[{receiverid:id},{senderid:recevierid}]
            }
           ]
        
    })
    

    res.send(user)
   
})

export{messages , user ,usermsg}