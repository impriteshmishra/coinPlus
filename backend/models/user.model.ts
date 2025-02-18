import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    alerts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alert" }], // it refer to alert
},{timestamps:true});
export const User = mongoose.model('User', userSchema);