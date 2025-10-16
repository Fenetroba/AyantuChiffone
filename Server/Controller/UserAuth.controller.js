import UserData from "../Model/UserAuth.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import "dotenv/config"
export const Registration =async(req,res)=>{
``
     const {fullname,email,password,profileimage} =req.body;
     try {
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
               return res.status(400).json({ message: "Invalid email format" });
             }

          if(!fullname || !email || !password){
               return res.status(400).json({success:false,message:"all Field is requered"})
          }
          
     const User=await UserData.findOne({email})
     if(User){
          return res.status(400).json({success:false,messag:"User already exist"})
     }
     const HashPassword=await bcrypt.hash(password,10)

     const NewUser=await UserData.create({fullname:fullname,email:email,password:HashPassword,profileimage:profileimage})
        
    return res.status(201).json({success:true,message:"the user is created",NewUser})
     } catch (error) {
          console.log(error.message)
        return res.status(500).json({success:false,message:"server error on Registration Controller"})  
     }


}
export const Login = async (req, res) => {
     const { email, password } = req.body;
   
     try {
    
       if (!email || !password) {
         return res.status(400).json({
           success: false,
           message: "All fields are required",
         });
       }
   
   
       const user = await UserData.findOne({ email });
       if (!user) {
         return res.status(400).json({
           success: false,
           message: "This user does not exist",
         });
       }
   
       
       const isPasswordCorrect = await bcrypt.compare(password, user.password);
       if (!isPasswordCorrect) {
         return res.status(400).json({
           success: false,
           message: "Invalid password",
         });
       }
      
   
      
       
   
       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "7d"
        });
    res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: 'none',
        });
       return res.status(200).json({
         success: true,
         message: "User logged in successfully",
         user: user,
         token:token
       });

       


   
     } catch (error) {
       console.log(error.message);
       return res.status(500).json({
         success: false,
         message: "Server error on Login Controller",
       });
     }
   };
export const LogOut = async (req, res) => {
     try {
       res.clearCookie("token");
       return res.status(200).json({ success: true, message: "User logged out successfully" });
     } catch (error) {
       console.error("Error logging out user:", error);
       return res.status(500).json({ message: "Internal server error" });
     }
   };
export const Profile=async(req,res)=>{
     try {
          const User=req.UserOne
          return res.status(200).json({success:true,message:"User Profile",User})
     } catch (error) {
          console.error("Error on Profile user:", error);
       return res.status(500).json({ message: "Internal server error" }); 
     }
   }
   