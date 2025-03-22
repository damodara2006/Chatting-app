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
})

const LoginSchema = mongoose.model('login' , login);

export {LoginSchema};