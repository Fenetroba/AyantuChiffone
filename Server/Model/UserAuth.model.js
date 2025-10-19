import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
         fullname:{type:String,requered:true},
         email:{type:String,requered:true, unique:true},
         role:{type:String, enum:["admin","shop"],default:"shop"},
         password:{type:String,requered:true,minlength:[6,"password must be at least 6 characters"]},
         profileimage:{type:String}

},{timestamps:true})

const UserData=mongoose.model('User',UserSchema)
export default UserData