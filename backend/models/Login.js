import mongoose, { Schema } from "mongoose";

const login = new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    username:{
        type:String
    },
    profile:{
        type:String
    }
},
{
    timestamps:true
})

const LoginSchema = mongoose.model('login' , login);

export {LoginSchema};