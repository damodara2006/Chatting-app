import mongoose from "mongoose";
import { Schema } from "mongoose";

const message = new Schema({
    senderid:{
        type:Schema.ObjectId,
        required:true
    },
    receiverid:{
        type:Schema.ObjectId,
        required:true
    },
    message:{
        type:String
    },
    nontext:{
        type:String
    },
    
},{
    timestamps:true
})

 const messageSchema = mongoose.model("message",message) 

 export {messageSchema}